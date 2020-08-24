import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-terms-conditions-privacy',
  styleUrls: ['./terms-conditions-privacy.component.scss'],
  template: `
  <ngx-one-column-no-footer>
    <router-outlet></router-outlet>
  </ngx-one-column-no-footer>
`,
})
export class TermsConditionsPrivacyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
