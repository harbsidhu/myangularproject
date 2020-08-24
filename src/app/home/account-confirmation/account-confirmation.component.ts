import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { MessageService } from '../../_services/message.service';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'ngx-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.scss'],
})
export class AccountConfirmationComponent implements OnInit {

  public isToken: boolean = false;
  public isTokenProcessed: boolean = false;
  public email: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
    private storageService: StorageService) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(queryParams => {
      const token = queryParams['key'];
      const  id = queryParams['id'];
      this.email = this.storageService.getItem('confirmEmail');

      this.isToken = token !== undefined;

      if (this.isToken){
        this.userConfimration(token);
      } else {
        this.sendConfirmationEmail(id);
      }
      // Call your Backend API with the token after this
    });
  }

  sendConfirmationEmail(id: string) {
    const data = {id: id};
    this.userService.sendConfirmationEmail(id).subscribe(res => {
      this.storageService.clear('confirmEmail');
    },
    error => {
      this.messageService.showErrorToast('Error', 'Error occurred while processing email.');
    },
    );
  }

  userConfimration(token: string) {
    const data = {key: token};
    this.userService.userConfirmation(data).subscribe(res => {
      this.isTokenProcessed = true;
    },
    error => {
      this.messageService.showErrorToast('Error', 'Error occurred while processing user confirmation.');
    },
    );
  }

  navigateToContactUs() {
    this.router.navigate(['home/contactus']);
  }

  navigateToHome() {
    this.router.navigate(['']);
  }
}
