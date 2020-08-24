import { Component} from '@angular/core';

@Component({
  selector: 'ngx-one-column-no-menu-layout',
  styleUrls: ['one-column-no-menu.layout.scss'],
  template: `
  <nb-layout windowMode>
    <nb-layout-header fixed>
      <ngx-header></ngx-header>
    </nb-layout-header>

    <nb-layout-column>
      <ng-content select="router-outlet"></ng-content>
    </nb-layout-column>


  </nb-layout>
`,
})
export class OneColumnNoMenuLayoutComponent {
      // <nb-layout-footer class="z-index-9999" fixed>
    //   <ngx-footer></ngx-footer>
    // </nb-layout-footer>

  constructor() { }

}
