import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-one-column-no-footer',
  styleUrls: ['./one-column-no-footer.component.scss'],
  template: `
  <nb-layout windowMode>
  <nb-layout-header fixed>
    <ngx-header></ngx-header>
  </nb-layout-header>

  <nb-layout-column class="nb-layout-column-background">
      <ng-content select="router-outlet"></ng-content>
    </nb-layout-column>

 </nb-layout>
 <style>
 nb-layout.window-mode {
  background:transparent !important;
}

nb-layout .layout{
background:transparent !important;
}


.nb-layout-column-background {
background-image: url('../../../../assets/images/landing_page.jfif');
background-size: cover;
padding:0 !important;
}
 </style>
`,
})
export class OneColumnNoFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
