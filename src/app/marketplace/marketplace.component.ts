import { Component, OnInit } from '@angular/core';
import { MenuService } from '../_services/menu.service';
import { NbMenuItem } from '@nebular/theme';
import { User } from '../_models/user';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'ngx-marketplace',
  styleUrls: ['./marketplace.component.scss'],
  template: `
    <ngx-one-column-layout>
        <nb-menu [items]="menu"></nb-menu>
        <router-outlet></router-outlet>    
    </ngx-one-column-layout>
  `,
})
export class MarketplaceComponent implements OnInit {

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
