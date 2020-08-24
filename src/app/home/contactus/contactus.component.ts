import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactUsDTO } from '../../_models/contactusDto';
import { UserService } from '../../_services/user.service';
import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'ngx-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  contactFrom: FormGroup;
  isEmailSent = false;

  public termAgreed: boolean = false;
  public isTermError: boolean = false;

  userMenu = [{ title: 'Dashboard', link: 'dash/dashboard' },
  { title: 'Profile', link: 'user/profile' },
  { title: 'Logout', link: '/' }];

  constructor(private router: Router, private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService) {
    this.contactFrom = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  contactSubmit() {
    if (this.contactFrom.valid) {
      const contactemail = new ContactUsDTO();
      contactemail.name = this.contactFrom.controls.name.value.trim();
      contactemail.companyName = this.contactFrom.controls.companyName.value.trim();
      contactemail.email = this.contactFrom.controls.email.value.trim();
      contactemail.phone = this.contactFrom.controls.phone.value.trim();
      contactemail.message = this.contactFrom.controls.message.value.trim();

      this.userService.sendContactUsEmail(contactemail).subscribe(
        () => {
          this.messageService.showSuccessToast("Message Received!","Your message is received successfully.")
          this.isEmailSent = true;

          this.navigateToHome();
        });
    } else {
      this.validateAllFormFields(this.contactFrom);
    }
  }

  navigateToHome() {
    this.router.navigate(['']);
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
