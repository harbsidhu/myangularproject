import { Component, OnInit, ViewChild } from '@angular/core';
import { ParameterService } from '../../_services/parameter.service';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { ResourceService } from '../../_services/resource.service';
import { SelectItem } from '../../_models/selectItem';
import { Router } from '@angular/router';
import { ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  _resources: Array<SelectItem> = new Array;
  _resourcesTrials: any;
  _user: User;
  _primaryAddress: string;
  _adAddresses: Array<string> = new Array;
  treeOptions: ITreeOptions;
  public isMigrationComplete: boolean = false;
  @ViewChild('tree', { static: false }) tree;

  constructor(
    private router: Router,
    private paramService: ParameterService,
    private userService: UserService,
    private resourceService: ResourceService) { }

  ngOnInit() {

    this._user = (<User>JSON.parse(localStorage.getItem('user')));
    this.isMigrationComplete = this._user.company.isMigrationComplete;
    this._primaryAddress = this._user.company.addresses.find(x => x.isPrimary === true).fullAddress;
    this._adAddresses = this._user.company.addresses
    .filter(x => x.isPrimary === false).map(x => x.fullAddress);
    this.getInterests();
  }

  getInterests() {
    this.resourceService.getResourcesByCompany(this._user.company.id)
      .subscribe(res => {
        this._resources = res;
      });
  }

  navigateToUserInterest() {
    this.router.navigate(['user/interests']);
  }

  navigateToProfileUpdate() {
    this.router.navigate(['user/profile/update']);
  }

  navigateToChangePassword() {
    this.router.navigate(['home/auth/reset']);
  }

  navigateToConfirmResources() {
    this.router.navigate(['user/confirmresource']);
  }

}
