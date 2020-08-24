import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  firstForm: FormGroup;
  public isEmailFound = false;
  private isError = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.firstForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    if (this.firstForm.invalid) {
      return;
    }
    this.isError = false;

    this.authService.recoverPassword(this.firstForm.controls.email.value.trim()).subscribe(
      res => {
          this.isEmailFound = true;
      },
      error => {
        this.isError = true;
      });
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

}
