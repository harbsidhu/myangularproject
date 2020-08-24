import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { AuthCallService } from '../../../_services/authcall.service';
import { AuthUser } from '../../../_models/authUser';
import { OperationResult } from '../../../_models/operationResult';
import { Router } from '@angular/router';
import { StorageService } from '../../../_services/storage.service';
import { User } from '../../../_models/user';
import { AuthService } from '../../../_services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { NbDialogService } from '@nebular/theme';


@Component({
  providers: [HeaderComponent],
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isError: boolean = false;

  public termAgreed: boolean = false;
  public isTermError: boolean = false;
  public loading: boolean = false;

  userMenu = [{ title: 'Dashboard', link: 'dash/dashboard' },
  { title: 'Profile', link: 'user/profile' },
  { title: 'Logout', link: '/' }];

  constructor(private router: Router, private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private headerComp: HeaderComponent,
    private nbDialogService: NbDialogService,
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  Login() {
    if (!this.termAgreed) {
      this.isTermError = true;
      this.validateAllFormFields(this.loginForm);
    } else {
      this.loading = true;
      this.isTermError = false;
      let error: any;
      if (this.loginForm.valid) {
        const authUser: AuthUser = {
          email: this.loginForm.value.email.trim(),
          password: this.loginForm.value.password,
        };
        // let result = new OperationResult(false, '', null);
        let result: any;
        this.authService.login(authUser)
          .subscribe(
            res => {
              result = res;
            },
            error => {
              // this.notificationService.printErrorMessage('Changes could not be applied');

              const errMsg: string = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';
              this.isError = true;
              error = error;
            },
            () => {
              if (result.Succeeded) {
                // this.notificationService.printSuccessMessage('Programming record deleted successfully');
                const user = (<User>(<any>result).responseBody);
                this.authService.setToken(user.token);
                this.storageService.store('user', user);
                this.storageService.store('jwt', user.token);
                this.storageService.store('menu', this.userMenu);
                this.headerComp.Menus = this.userMenu;

                if (user.company.isInterestsRegistered === false) {
                  this.router.navigateByUrl('user/interests');
                } else {
                  this.router.navigateByUrl('dash/dashboard');
                }

                console.log(result);
                console.log(user.token);
                //  this.invalidLogin = false;

              } else {
                //this.notificationService.printErrorMessage(result.Message);
              }
            });
      } else {
        this.validateAllFormFields(this.loginForm);
      }
      if (error !== undefined) {

      }
    }
  }

  toggle(checked: boolean) {
    this.termAgreed = checked;
  }

  openTnC() {
    window.open('docs/tnc');
//this.nbDialogService.open(TermsAndConditionsComponent);
  }

  openPrivacy() {
    window.open('docs/privacy');
//this.nbDialogService.open(TermsAndConditionsComponent);
  }

  navigateToCreateAccount() {
    this.router.navigate(['user/registration']);
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

}
