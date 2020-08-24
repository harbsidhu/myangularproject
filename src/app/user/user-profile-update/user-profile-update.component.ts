import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { NbStepperComponent, NbStepComponent } from '@nebular/theme';
import { Router } from '@angular/router';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { Address } from '../../_models/address';
import { AbnDetails } from '../../_models/abnDetails';
import { User } from '../../_models/user';
import { Company } from '../../_models/company';
import { CompanyService } from '../../_services/company.service';
import { NoOfEmployees, Council, Division, SubDivision } from '../../_models/masterData';
import { MasterdataService } from '../../_services/masterdata.service';
import { environment } from '../../../environments/environment';
import { Subscription } from '../../_models/subscription';
import { MessageService } from '../../_services/message.service';
import { StorageService } from '../../_services/storage.service';

declare var AddressFinder: any;

@Component({
  selector: 'ngx-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss'],
})
export class UserProfileUpdateComponent implements OnInit {

  public _noOfEmployees = new Array<NoOfEmployees>();
  public _councils = new Array<Council>();
  public _divisions = new Array<Division>();
  public _subDivisions = new Array<SubDivision>();

  public _noOfEmployeesDisplay: NoOfEmployees;
  public _councilDisplay: Council;
  public _divisionDisplay: Division;
  public _subDivisionDisplay: SubDivision;

  public _company: Company = new Company();
  public _companyFromDb: Company;
  public _user: User = new User();
  public _subscription: Subscription;

  public _primaryFullAddress: string;
  public _stripeToken: any;
  public _paymentDone: boolean = false;
  public IsABNValid: boolean = false;

  public IsPrimaryAddressChanged: boolean = false;

  isCompanyPhoneValid: boolean = true;
  isPersonalContactValid: boolean = true;
  isUserValid: boolean = true;
  isUserCreated: boolean = false;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  forthForm: FormGroup;
  passwords: FormGroup;

  adnlAddresses: string[] = new Array();
  additionalAddressInput: any;
  primaryAddressInput: any;
  additionalAddresses: Address[] = new Array();
  abnDetails: AbnDetails;
  // stepper: NbStepperComponent;
  // step1: NbStepComponent;
  @ViewChild('secondFormElement', null) secondFormElement: Element;
  @ViewChild('PersonalStep', null) PersonalStep: NbStepComponent;
  @ViewChild('CompanyStep', null) CompanyStep: NbStepComponent;
  @ViewChild('stepper1', null) stepper: NbStepperComponent;
  @ViewChild('primaryAddress', null) primaryAddressControl: ElementRef;
  @ViewChild('additionalAddress', null) additionalAddressControl: ElementRef;

  @ViewChild('adnLine1', null) adnLine1: ElementRef;
  @ViewChild('adnLine2', null) adnLine2: ElementRef;
  @ViewChild('adnLat', null) adnLat: ElementRef;
  @ViewChild('adnLon', null) adnLon: ElementRef;
  @ViewChild('adnPostCode', null) adnPostCode: ElementRef;
  @ViewChild('adnSuburb', null) adnSuburb: ElementRef;
  @ViewChild('adnState', null) adnState: ElementRef;

  @ViewChild('prmLine1', null) prmLine1: ElementRef;
  @ViewChild('prmLine2', null) prmLine2: ElementRef;
  @ViewChild('prmLat', null) prmLat: ElementRef;
  @ViewChild('prmLon', null) prmLon: ElementRef;
  @ViewChild('prmPostCode', null) prmPostCode: ElementRef;
  @ViewChild('prmSuburb', null) prmSuburb: ElementRef;
  @ViewChild('prmState', null) prmState: ElementRef;

  options = [
    { value: '1', label: 'Hello', checked: true },
    { value: '0', label: 'No' },
  ];

  // For International phone number dropdown
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Australia, CountryISO.NewZealand];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private companyService: CompanyService,
    private masterDataService: MasterdataService,
    private messageService: MessageService,
    private storageService: StorageService) {
  }


  ngOnInit() {

   this.firstForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
     personalContact: [undefined],
    });

    this.secondForm = this.fb.group({
      companyName: ['Aspire Tech', Validators.required],
      abn: ['', Validators.required],
      noOfEmployees: ['', Validators.required],
      jobRole: ['Director', Validators.required],
      council: ['', Validators.required],
      division: ['', Validators.required],
      subDivision: ['', Validators.required],
      recycler: ['', Validators.required],
      companyPhone: [undefined],
      primaryAddress: ['', Validators.required],
      additionalAddress: [''],
    }, { validators: this.CheckABN });

this._user = this.storageService.getItem('user');
    this.getNoOfEmployees();
    this.getCouncils();
    this.getDivisions();
    this.loadFirstForm();
  }

  loadFirstForm() {
    this.firstForm.controls.firstName.setValue(this._user.firstname);
    this.firstForm.controls.lastName.setValue(this._user.lastname);
    this.firstForm.controls.email.setValue(this._user.email);
    this.firstForm.controls.personalContact.setValue(this._user.personalContact);
    this.getSubDivisions(this._user.company.division.id);
  }

  loadSecondForm() {
    this.secondForm.controls.abn.setValue(this._user.company.abn);
    this.secondForm.controls.companyName.setValue(this._user.company.name);
    this.secondForm.controls.jobRole.setValue(this._user.jobRole);
    this.secondForm.controls.recycler.setValue(this._user.company.recycler === true ? '1' : '2');
    this.secondForm.controls.companyPhone.setValue(this._user.company.phone);

    this.secondForm.controls.noOfEmployees.setValue(this._user.company.noOfEmployees.id);
    this.secondForm.controls.council.setValue(this._user.company.council.id);
    this.secondForm.controls.division.setValue(this._user.company.division.id);
    this.secondForm.controls.subDivision.setValue(this._user.company.subDivision.id);

    this.primaryAddressControl.nativeElement.value
        = this._user.company.addresses.find(x => x.isPrimary === true).fullAddress;
    this.secondForm.controls.primaryAddress.setValue(
        this._user.company.addresses.find(x => x.isPrimary === true).fullAddress);
    this.additionalAddresses = this._user.company.addresses.filter(x => x.isPrimary === false);
    this._councilDisplay = this._councils.find(x => x.id === this._user.company.council.id);
    this._noOfEmployeesDisplay = this._noOfEmployees.find(x => x.id === this._user.company.noOfEmployees.id);
    this._subDivisionDisplay = this._subDivisions.find(x => x.id === this._user.company.subDivision.id);
    this._divisionDisplay = this._divisions.find(x => x.id === this._user.company.division.id);
}



  onFirstSubmit() {
    this.ValidatePersonalContact();
    if (this.firstForm.valid && this.isPersonalContactValid) {
      this.stepper.next();
      // Address Finder API
      const script = document.createElement('script');
      script.src = 'https://api.addressfinder.io/assets/v3/widget.js';
      script.async = true;
      script.onload = this.initAddressFinder;
      document.body.appendChild(script);

      // Additional Address
      const script1 = document.createElement('script');
      script1.src = 'https://api.addressfinder.io/assets/v3/widget.js';
      script1.async = true;
      script1.onload = this.AdditionalAddressFinder;
      document.body.appendChild(script1);
      this.markDropDownAsUnTouched();
      this.loadSecondForm();
    } else {
      this.validateAllFormFields(this.firstForm);
    }
  }

  onSecondSubmit() {
    this.ValidateCompanyPhone();
    if (this.secondForm.valid && this.isCompanyPhoneValid) {
      this.stepper.next();
    } else {
      this.validateAllFormFields(this.secondForm);
    }
  }

onThirdSubmit() {
    this.updateUser();
    if (!this.isUserCreated)
    this.saveUser();
    this.stepper.next();
}

  onForthSubmit() {
    this.forthForm.markAsDirty();
  }

  selectPersonalStep() {
    this.PersonalStep.select();
  }

  selectCompanyStep() {
    this.CompanyStep.select();
  }

  getNoOfEmployees() {
    this.masterDataService.
      getNoOfemployees().subscribe(res => {
        this._noOfEmployees = res;
      });
    this.secondForm.controls.noOfEmployees.setValue('');
  }

  getCouncils() {
    this.masterDataService.
      getCouncils().subscribe(res => {
        this._councils = res;
      });
    this.secondForm.controls.council.setValue('');
  }

  getDivisions() {
    this.masterDataService.
      getDivisions().subscribe(res => {
        this._divisions = res;
        this._subDivisions = this._divisions.find(x => x.id === this._user.company.division.id).subDivisions;
      });
    this.secondForm.controls.division.setValue('');
  }

  getSubDivisions(id: any) {
    this._divisionDisplay = this._divisions.find(x => x.id === id);
    this._subDivisions = this._divisions.find(x => x.id === id).subDivisions;
    this.secondForm.controls.subDivision.setValue('');
  }

  onNoOfEmployeeChange(id: any) {
    this._noOfEmployeesDisplay = this._noOfEmployees.find(x => x.id === id);
  }

  onCouncilChange(id: any) {
    this._councilDisplay = this._councils.find(x => x.id === id);
  }

  onSubDivisionChange(id: any) {
    this._subDivisionDisplay = this._subDivisions.find(x => x.id === id);
  }

  markDropDownAsUnTouched() {
    this.secondForm.controls.division.markAsUntouched();
    this.secondForm.controls.subDivision.markAsUntouched();
    this.secondForm.controls.council.markAsUntouched();
    this.secondForm.controls.noOfEmployees.markAsUntouched();
  }

  addNewAddressRow() {
    if (this.additionalAddressControl.nativeElement.value.trim() !== '') {
      const index: number = this.additionalAddresses.
        findIndex(add => add.fullAddress === this.additionalAddressControl.nativeElement.value);
      if (index === -1) {
        this.additionalAddressInput = Object.assign(new Address(), {
          fullAddress: this.additionalAddressControl.nativeElement.value.trim(),
          line1: this.adnLine1.nativeElement.value,
          line2: this.adnLine2.nativeElement.value,
          latitude: this.adnLat.nativeElement.value,
          longitude: this.adnLon.nativeElement.value,
          postcode: this.adnPostCode.nativeElement.value,
          suburb: this.adnSuburb.nativeElement.value,
          state: this.adnState.nativeElement.value,
          isPrimary: false
        });

        this.additionalAddresses.push(this.additionalAddressInput);
        this.additionalAddressControl.nativeElement.value = '';
      }
    }
  }

  deleteAddressRow(fullAddress: string) {
    const index: number = this.additionalAddresses.
      findIndex(add => add.fullAddress === fullAddress);
    if (index !== -1) {
      this.additionalAddresses.splice(index, 1);
    }
  }

  // Primary Address finders
  initAddressFinder() {
    const widget = new AddressFinder.Widget(
      document.getElementById('primaryAddress'),
      environment.addressFinderKey,
      'AU',
      {},
    );

    widget.on('result:select', function (fullAddress, metaData) {

      (document.getElementById('primaryAddress') as HTMLInputElement).value = metaData.full_address;
      (document.getElementById('prmLine1') as HTMLInputElement).value = metaData.address_line_1;
      (document.getElementById('prmLine2') as HTMLInputElement).value = metaData.address_line_2;
      (document.getElementById('prmLat') as HTMLInputElement).value = metaData.latitude;
      (document.getElementById('prmLon') as HTMLInputElement).value = metaData.longitude;
      (document.getElementById('prmPostCode') as HTMLInputElement).value = metaData.postcode;
      (document.getElementById('prmSuburb') as HTMLInputElement).value = metaData.locality_name;
      (document.getElementById('prmState') as HTMLInputElement).value = metaData.state_territory;
    });
  }

  // Additional Address finders
  AdditionalAddressFinder() {
    const widget = new AddressFinder.Widget(
      document.getElementById('additionalAddress'),
      environment.addressFinderKey,
      'AU',
      {},
    );

    widget.on('result:select', function (fullAddress, metaData) {
      (document.getElementById('additionalAddress') as HTMLInputElement).value = metaData.full_address;
      (document.getElementById('adnLine1') as HTMLInputElement).value = metaData.address_line_1;
      (document.getElementById('adnLine2') as HTMLInputElement).value = metaData.address_line_2;
      (document.getElementById('adnLat') as HTMLInputElement).value = metaData.latitude;
      (document.getElementById('adnLon') as HTMLInputElement).value = metaData.longitude;
      (document.getElementById('adnPostCode') as HTMLInputElement).value = metaData.postcode;
      (document.getElementById('adnSuburb') as HTMLInputElement).value = metaData.locality_name;
      (document.getElementById('adnState') as HTMLInputElement).value = metaData.state;
    });
  }

  updateUser() {
   this._company.id = this._user.company.id;
    this._company.abn = this.secondForm.value.abn.replace(/\s/g, '');
    this._company.name = this.secondForm.value.companyName;
    this._company.noOfEmployees = this._noOfEmployees.find(x => x.id === this.secondForm.value.noOfEmployees);
    this._company.division = this._divisions.find(x => x.id === this.secondForm.value.division);
    this._company.subDivision = this._subDivisions.find(x => x.id === this.secondForm.value.subDivision);
    this._company.council = this._councils.find(x => x.id === this.secondForm.value.council);
    this._company.recycler = this.secondForm.value.recycler === '1';
    this._company.phone = this.secondForm.value.companyPhone.nationalNumber.replace(/\s/g, '');
    this._company.dateCreated = this._user.company.dateCreated;
    this._company.addresses = this.additionalAddresses;

    if (this.IsPrimaryAddressChanged) {
      this.primaryAddressInput = Object.assign(new Address(), {
        fullAddress: this.primaryAddressControl.nativeElement.value.trim(),
        line1: this.prmLine1.nativeElement.value,
        line2: this.prmLine2.nativeElement.value,
        latitude: this.prmLat.nativeElement.value,
        longitude: this.prmLon.nativeElement.value,
        postcode: this.prmPostCode.nativeElement.value,
        suburb: this.prmSuburb.nativeElement.value,
        state: this.prmState.nativeElement.value,
        isPrimary: true
      });
      this._company.addresses.push(this.primaryAddressInput);
    } else {
      const primAddress = this._user.company.addresses.find(x => x.isPrimary === true);
      primAddress.id = 0;
      this._company.addresses.push(primAddress);
    }

    this._company.isRegistered = this._user.company.isRegistered;
    this._company.isInterestsRegistered = this._user.company.isInterestsRegistered;
    this._company.isMigrationComplete = this._user.company.isMigrationComplete;
    this._user.firstname = this.firstForm.value.firstName;
    this._user.lastname = this.firstForm.value.lastName;
    this._user.password = this.firstForm.value.password;
    this._user.personalContact = this.firstForm.value.personalContact.nationalNumber === 'undefined'
      ? this.firstForm.value.personalContact.replace(/\s/g, '')
      : this.firstForm.value.personalContact.nationalNumber.replace(/\s/g, '');
    this._user.jobRole = this.secondForm.value.jobRole;
    this._user.IsEnabled = true;
    this._company.status = this._user.company.status;
    this._company.users.push(this._user);
  }

  saveUser() {
    this.companyService.updateCompany(this._company).subscribe(res => {
      if (res) {
        console.log('saveUser(): Company: ' + JSON.stringify(res));
        const user = res.responseBody;
        this.storageService.store('user', user);
        this.messageService.showSuccessToast('Success', 'Profile updated successfully');
        this.router.navigate(['user/profile']);

      }
    },
      error => {
       console.log('Error: ' + error);
       this.messageService.showErrorToast('Errror', 'Error occurred while updating profile.');
      });
  }

  ValidateCompanyPhone() {
    const CompanyContactHtml = (document.getElementById('companyPhone') as HTMLElement);
    const companyPhone = (CompanyContactHtml.firstElementChild.children[1] as HTMLInputElement);
    this.isCompanyPhoneValid = companyPhone.value.trim() !== '';
    return this.isCompanyPhoneValid;
  }

  ValidatePersonalContact() {
    const PersonalContactHtml = (document.getElementById('personalContact') as HTMLElement);
    const PersonalContact = (PersonalContactHtml.firstElementChild.children[1] as HTMLInputElement);
    this.isPersonalContactValid = PersonalContact.value.trim() !== '';
    return this.isPersonalContactValid;
  }

  navigateToInterests() {
    this.router.navigate(['user/interests']);
  }

  MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getABNDetails() {
    if (!this.secondForm.controls.abn.valid) {
      return;
    }

    if (this.secondForm.controls.abn.valid) {
      const abn = this.secondForm.controls.abn.value;
      this.companyService.getCompanyDetailsByABN(abn).subscribe(res => {
        if (res) {
          this.abnDetails = res;

          this.secondForm.controls.companyName.setValue(this.abnDetails.companyName);
          this.secondForm.controls.council.setValue(this.abnDetails.council.id);
          this._councilDisplay = this._councils.find(x => x.id === this.abnDetails.council.id);
          this.IsABNValid = true;
        }
      },
        error => {
          this.IsABNValid = false;
          this.messageService.showErrorToast('Error', 'Error occurred while fetching ABN details. Contact ASPIRE admin.');
          console.error('Error: ' + error);
        });
    }
  }

  CheckABN(AC: AbstractControl) {
    const Weights = new Array(10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19);
    const ABN = AC.get('abn').value.replace(/\s/g, '');

    if (ABN.length !== 11) {
      AC.get('abn').setErrors({ CheckABN: true });
    } else {
      let total = 0;
      let i: number;
      for (i = 0; i < 11; i++) {
        if (i === 0)
        total += Weights[i] * (ABN.charAt(i) - 1);
        else
        total += Weights[i] * ABN.charAt(i);
      }
      if (total === 0 || total % 89 !== 0) {
        AC.get('abn').setErrors({ CheckABN: true });
      } else {
        return null;
      }
    }
  }

  payment() {

    const handler = (<any>window).StripeCheckout.configure({
      key: environment.stripeKey,
      locale: 'auto',
      currency: 'aud',
      image: 'https://aspiresme.com/wp-content/uploads/2019/06/logolaptopd.png',
      token: (token: any) => { this.storePaymentToken(token); },
    });
    handler.open({
      name: 'Aspire',
      description: '"subscription"',
      amount: this._subscription.amount * 100,
    });
  }

storePaymentToken(token) {
  console.log('payment(): token: ' + JSON.stringify(token));
  this._stripeToken = token;
  const companySubscription = {
    companyId: this._company.id,
    subscriptionId: this._subscription.id,
    subscription: this._subscription,
    transactionId: token.id,
  };

  this.companyService.createComapnySubscription(companySubscription).subscribe(res => {
    if (res) {
      this._paymentDone = true;
    }
  },
    error => {
      this.messageService.showErrorToast('Errror', 'Error occurd while saving company details.');
      console.error('Error: ' + error);
    });
}
}
