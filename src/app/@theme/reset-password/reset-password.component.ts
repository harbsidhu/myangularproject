import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { User } from '../../_models/user';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  private _location: Location;
  public isSuccess: boolean = false;
  public resetForm: FormGroup;
  private _user: User;
  public token: string;

  constructor(private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService) {
    this._location = location;
  }

  ngOnInit() {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.MatchPassword });

    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.token = queryParams['token'];
      // Call your Backend API with the token after this
    });

    // this.activatedRoute.paramMap.subscribe(params => {
    //   this.token = params.get('token');
    // });
    this._user = this.storageService.getItem('user');
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

  Reset() {
    const password = this.resetForm.value.password.trim();
    if (this.resetForm.valid) {

      if (this.token === null || this.token === undefined) {
        if (this._user !== null) {
          this.authService.changePassword(this._user.id, password).subscribe(res => {
            // this.storageService.clear('user');
            if (res) {
              this.isSuccess = true;
            }
          },
            error => {
              console.log(error);
            });
        } else {
          // throw error
        }
      } else {
        this.authService.changePasswordWithToken(this.token, password).subscribe(res => {
          // this.storageService.clear('user');
          if (res) {
            this.isSuccess = true;
          }
        },
          error => {
            console.log(error);
          });
      }
    } else {
      this.validateAllFormFields(this.resetForm);
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

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToLogin() {
    this.router.navigate(['home']);
  }
}
