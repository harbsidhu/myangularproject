import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-user',
  styleUrls: ['./user.component.scss'],
  template: `
    <ngx-one-column-no-menu-layout>
      <router-outlet></router-outlet>
    </ngx-one-column-no-menu-layout>
  `,
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
