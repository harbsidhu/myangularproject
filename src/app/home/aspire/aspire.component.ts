import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { HeaderComponent } from '../../@theme/components';
import { AuthUser } from '../../_models/authUser';
import { User } from '../../_models/user';

@Component({
  selector: 'ngx-aspire',
  templateUrl: './aspire.component.html',
  styleUrls: ['./aspire.component.scss'],
})
export class AspireComponent implements OnInit {
  loginForm: FormGroup;
  isError: boolean = false;

  public termAgreed: boolean = false;
  public isTermError: boolean = false;
  private returnUrl: string;

  userMenu = [{ title: 'Dashboard', link: 'dash/dashboard' },
  { title: 'Profile', link: 'user/profile' },
  { title: 'Logout', link: '/' }];

  constructor(private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private storageService: StorageService,
    private headerComp: HeaderComponent) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    if(!this.authService.isTokenExpired())
    {     
      this.router.navigateByUrl('dash/dashboard');
    }
  }

  Login() {
    let error: any;
    if (this.loginForm.valid) {
      const authUser: AuthUser = {
        email: this.loginForm.value.email.trim(),
        password: this.loginForm.value.password,
      };
      let result: any;
      this.authService.login(authUser)
        .subscribe(
          res => {
            result = res;
          },
          error => {
            const errMsg: string = (error.message) ? error.message :
              error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            this.isError = true;
            error = error;
          },
          () => {
            if (result.Succeeded) {
              const user = (<User>(<any>result).responseBody);
              this.authService.setToken(user.token);
              this.storageService.store('user', user);
              this.storageService.store('jwt', user.token);

              if (!user.company.isMigrationComplete) {
                this.storageService.store('menuRetain', this.userMenu);
                this.router.navigateByUrl('user/welcomeback');
              } else if (user.company.isInterestsRegistered === false) {
                this.storageService.store('menu', this.userMenu);
                this.router.navigateByUrl('user/interests');
              } else {
                this.storageService.store('menu', this.userMenu);
                this.headerComp.Menus = this.userMenu;
                if (this.returnUrl !== '/') {
                  this.router.navigateByUrl(this.returnUrl);
                } else {
                  this.router.navigateByUrl('dash/dashboard');
                }
              }
            }
          });
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }

  navigateToCreateAccount() {
    this.router.navigate(['user/registration']);
  }

  navigateToForgotpassword() {
    this.router.navigate(['home/auth/forgotpassword']);
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
