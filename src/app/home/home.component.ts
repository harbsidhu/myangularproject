import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-home',
  styleUrls: ['home.component.scss'],
  template: `
    <ngx-landing>
      <router-outlet></router-outlet>
    </ngx-landing>
  `,
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
