import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { StorageService } from '../_services/storage.service';
import { User } from '../_models/user';
import { MenuService } from '../_services/menu.service';

@Component({
  selector: 'ngx-user-dashboard',
  styleUrls: ['./user-dashboard.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class UserDashboardComponent implements OnInit {

  private _user: User;

  constructor(menuService: MenuService, storageService: StorageService) {
    this._user = storageService.getItem('user');
    let isCouncil = false;
    isCouncil = this._user === null ? false : this._user.isCouncil;
    this.menu = menuService.getMenuItems(isCouncil);
  }

  menu: NbMenuItem[];

  ngOnInit() {
  }

}
