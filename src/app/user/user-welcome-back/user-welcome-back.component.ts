import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-user-welcome-back',
  templateUrl: './user-welcome-back.component.html',
  styleUrls: ['./user-welcome-back.component.scss']
})
export class UserWelcomeBackComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToCompanyInterest() {
    this.router.navigateByUrl('user/interests');
  }

}
