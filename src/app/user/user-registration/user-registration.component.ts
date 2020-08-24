import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { NbStepperComponent, NbStepComponent, NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { Address } from '../../_models/address';
import { AbnDetails } from '../../_models/abnDetails';
import { User } from '../../_models/user';
import { Company } from '../../_models/company';
import { CompanyService } from '../../_services/company.service';
import { NoOfEmployees, Council, Division, SubDivision } from '../../_models/masterData';
import { MasterdataService } from '../../_services/masterdata.service';
import { Subscription } from '../../_models/subscription';
import { MessageService } from '../../_services/message.service';
import { StorageService } from '../../_services/storage.service';
import { StripepaymentComponent } from '../stripepayment/stripepayment.component';
import { StripeBillingDetails } from '../../_models/stripeBillingDetails';
import { environment} from '../../../environments/environment';

declare var AddressFinder: any;

@Component({
  selector: 'ngx-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {

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
  public _transId: string;
  public _paymentDone: boolean = false;
  public IsABNValid: boolean = false;
  public termAgreed: boolean = false;
  public companySubscription: any;
  public _noOfEmployeesfiltered = new Array<NoOfEmployees>();


  isCompanyPhoneValid: boolean = true;
  isPersonalContactValid: boolean = true;
  isUserValid: boolean = true;
  isUserCreated: boolean = false;
  isSubscriptionValid: boolean = false;
  isContactSellerForSubscription = false;
  isZeroSubscription = false;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  forthForm: FormGroup;
  passwords: FormGroup;
  stripeForm: FormGroup;
  adnlAddresses: string[] = new Array();
  additionalAddressInput: any;
  primaryAddressInput: any;
  primaryAddressString: string;
  additionalAddresses: Address[] = new Array();
  abnDetails: AbnDetails;
  userState: string;

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
  
  @ViewChild('cardElement', null) cardElement: ElementRef;

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
    private dialogService: NbDialogService,
    private masterDataService: MasterdataService,
    private messageService: MessageService,
    private storageService: StorageService) {
  }

  ngOnInit() {

    this.firstForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      personalContact: [undefined],
    }, { validator: this.MatchPassword });

    this.secondForm = this.fb.group({
      companyName: ['', Validators.required],
      abn: ['', Validators.required],
      noOfEmployees: ['', Validators.required],
      jobRole: ['', Validators.required],
      council: ['', Validators.required],
      division: ['', Validators.required],
      subDivision: ['', Validators.required],
      recycler: ['', Validators.required],
      companyPhone: [undefined],
      primaryAddress: ['', Validators.required],
      additionalAddress: [''],
    }, { validators: this.CheckABN });

    this.forthForm = this.fb.group({
      promoCode: ['']
    });

    this.getNoOfEmployees();
    this.getCouncils();
    this.getDivisions();
    this.secondForm.controls.subDivision.setValue('');
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
    } else {
      this.validateAllFormFields(this.firstForm);
    }
  }

  onSecondSubmit() {
    this.ValidateCompanyPhone();
    if (this.secondForm.valid && this.isCompanyPhoneValid) {
      this.getSubscription();
      this.stepper.next();
    } else {
      this.validateAllFormFields(this.secondForm);
    }
  }

  onThirdSubmit() {
    this.createUser();
    if (!this.isSubscriptionValid) {
      this.messageService.showErrorToast('Error', 'Error while creating profile. please contact support.');
      return;
    }
    this.stepper.disableStepNavigation = true;
    this.saveUser();
  }

  onForthSubmit() {
  }

  selectPersonalStep() {
    this.PersonalStep.select();
  }

  selectCompanyStep() {
    this.CompanyStep.select();
  }

  getNoOfEmployees(){
    this.masterDataService.
      getNoOfemployees().subscribe(res => {

        this._noOfEmployees = res.filter(noe => !noe.isCouncil);
        this._noOfEmployeesfiltered = this._noOfEmployees.filter( noe => noe.companyState == null);
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


  //Additional Addresses

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
          isPrimary: false,
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

  statePopulated() {

    this._noOfEmployeesfiltered = this._noOfEmployees.filter(noe => (this.prmState.nativeElement.value === "QLD") ? noe.companyState == 'QLD' : noe.companyState == null);
    this.secondForm.controls.noOfEmployees.reset();
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
      (document.getElementById('adnState') as HTMLInputElement).value = metaData.state_territory;
    });
  }

  createUser() {

    this._company = new Company();
    this._company.abn = this.secondForm.value.abn.replace(/\s/g, '');
    this._company.abnPostCode = this.abnDetails.postcode.postalcode;
    this._company.name = this.secondForm.value.companyName;
    this._company.noOfEmployees = this._noOfEmployees.find(x => x.id === this.secondForm.value.noOfEmployees);
    this._company.division = this._divisions.find(x => x.id === this.secondForm.value.division);
    this._company.subDivision = this._subDivisions.find(x => x.id === this.secondForm.value.subDivision);
    this._company.council = this._councils.find(x => x.id === this.secondForm.value.council);
    this._company.recycler = this.secondForm.value.recycler === '1';
    this._company.phone = this.secondForm.value.companyPhone.nationalNumber.replace(/\s/g, '');

    this.primaryAddressInput = Object.assign(new Address(), {
      fullAddress: this.primaryAddressControl.nativeElement.value.trim(),
      line1: this.prmLine1.nativeElement.value,
      line2: this.prmLine2.nativeElement.value,
      latitude: this.prmLat.nativeElement.value,
      longitude: this.prmLon.nativeElement.value,
      postcode: this.prmPostCode.nativeElement.value,
      suburb: this.prmSuburb.nativeElement.value,
      state: this.prmState.nativeElement.value,
      isPrimary: true,
    });
    this.primaryAddressString = this.primaryAddressControl.nativeElement.value.trim();
    this._company.addresses = new Array;
    this.additionalAddresses.forEach(x => this._company.addresses.push(x));
    this._company.addresses.push(this.primaryAddressInput);
    this._company.isRegistered = false;
    this._user = new User();
    this._user.firstname = this.firstForm.value.firstName;
    this._user.lastname = this.firstForm.value.lastName;
    this._user.email = this.firstForm.value.email;
    this._user.password = this.firstForm.value.password;
    this._user.personalContact = this.firstForm.value.personalContact.nationalNumber.replace(/\s/g, '');
    this._user.jobRole = this.secondForm.value.jobRole;
    this._user.IsEnabled = true;
    this._company.users.push(this._user);
    this.isUserValid = true;
  }

  saveUser() {
    if (!this.isUserValid) {
      return;
    }

    this.companyService.createCompany(this._company).subscribe(res => {
      if (res) {
        this._company = res.responseBody;
        this.isUserValid = true;
        this.stepper.next();
      }
    },
      error => {
        this.messageService.showErrorToast('Errror', error);
        this.isUserValid = false;
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

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToConfirmation() {
    this.router.navigate(['home/confirmation'], { queryParams: { id: this._company.id } });
  }

  openTnC() {
    window.open('docs/tnc');
  }

  openPrivacy() {
    window.open('docs/privacy');
  }

  toggleTermsCheckBox(checked: boolean) {
    this.termAgreed = checked;
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
          this.messageService.showErrorToast('Error', 'Error occurred while fetching ABN details. Contact Aspire admin.');
          console.error('Error: ' + error);
          // this._isLoading = false;
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

  paymentOrContact() {
    if (!this.termAgreed) {
      return;
    }

    if (this.isContactSellerForSubscription) {
      this.router.navigate(['home/contactus']);
      return;
    } else {
      this.storePaymentToken();
    }
  }

  checkPromo () {
    this.getSubscription();
  }

  storePaymentToken() {
    const companySubscription = {
      companyId: this._company.id,
      subscriptionId: this._subscription.id,
      subscription: this._subscription,
      transactionId: '',
      amount: this._subscription.exGst,
      isActive: true,
    };

    this.storageService.store('confirmEmail', this._user.email);

    this.companyService.createComapnySubscription(companySubscription)
      .subscribe(res => {
        if (res) {
          this.companySubscription = res.body;
          if (this.companySubscription.transactionId !== undefined && this.companySubscription.amount > 1) {
            this._transId = this.companySubscription.transactionId
            .substring(0, this.companySubscription.transactionId.indexOf('_secret'))
            this.openPaymentDialog();
          } else {
            this._paymentDone = true;
          }
        }
      },
        error => {
          this.messageService.showErrorToast('Errror', 'Error occurred while Storing Payment details.'
            + 'please contact ASPIRE quoting with Transaction Id.');
          console.error('Error: ' + error);
        });
  }

  getSubscription() {
 
    const _iscouncil = 'Others' !== this._councils.find(x => x.id === this.secondForm.value.council).name;
    const _noOfEmployees = this._noOfEmployees.find(x => x.id === this.secondForm.value.noOfEmployees).name;
    const _isRecycler = this.secondForm.value.recycler === '1';
    const promoCode = this.forthForm == undefined ? "": this.forthForm.value.promoCode;
    this.companyService.getSubscriptionPlan(_noOfEmployees, String(_isRecycler), String(_iscouncil),String(promoCode)).subscribe(res => {
        if (res) {
          this._subscription = res;
          this.isSubscriptionValid = true;
            this.isContactSellerForSubscription = this._subscription.isEnterprise;
            this.isZeroSubscription = this._subscription.amount === 0
            && !this._subscription.isEnterprise ? true : false;
          // this._isLoading = false;
          if(promoCode != "")
          {
            this.messageService.showSuccessToast('Information', 'Promocode Applied');
          }
        } else {
          this.messageService.showErrorToast('Errror', 'Error occurred while getting subscription details.');
          this.isSubscriptionValid = false;
        }
      },
        error => {
          this.messageService.showErrorToast('Errror', promoCode != "" ? 'Promocode Invalid' : 'Error occurred while getting subscription details.');
          this.isSubscriptionValid = false;
        });
  }

  card: any;

  openPaymentDialog() {
    const billing_details = new StripeBillingDetails();
    billing_details.name = this._user.firstname + ' ' + this._user.lastname;
    billing_details.address.line1 = this.primaryAddressString;
    billing_details.email = this._user.email;
    billing_details.phone = this._company.phone;
    this.dialogService.open(StripepaymentComponent, {
      closeOnBackdropClick: false,
      context: {
        billing_details: billing_details,
        transactionToken: this.companySubscription.transactionId,
        paymentAmount: this.companySubscription.subscription.amount,
      },
    })
      .onClose.subscribe(paymentdone => {
        this._paymentDone = paymentdone;
      });
  }
}
