import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceOutDashboard } from '../../_models/resourcesOutDashBoard';
import { DashboardService } from '../../_services/dashboard.service';
import { User } from '../../_models/user';
import { StorageService } from '../../_services/storage.service';
import { ResourceInDashboard } from '../../_models/resourceInDashboard';

@Component({
  selector: 'ngx-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  public columnDefsIn;
  public columnDefsOut;

  public resourcesOut: Array<ResourceOutDashboard> = new Array;
  public resourcesIn: Array<ResourceInDashboard> = new Array;
  private _user: User;
  private gridApi;
  private gridColumnApi;

  gridOptionsIn = {
    columnDefs: this.columnDefsIn,
    enableColResize: true,
  };

  gridOptionsOut = {
    columnDefs: this.columnDefsOut,
    enableColResize: true,
  };

  defaultColDef = {
    resizable: true,
  };


  constructor(private router: Router,
    private dashboardService: DashboardService,
    private storageService: StorageService) {
  }

   ngOnInit() {
    this._user = this.storageService.getItem('user');
    this.getResourcesOut();
    this.getResourcesIn();

  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  getResourcesOut() {
    this.dashboardService.getResourcesOut(this._user.company.id)
      .subscribe(res => {
        this.resourcesOut = res;
        this.resourcesOut.forEach(item => {
         item.attributeString = item.resourceListing.attributeString;
          item.resourceOffers.forEach(offer => {
            offer.offer = offer.offer === '0' ? 'AU $ FREE' : 'AU $ ' + offer.offer;
          });
        });
      });
  }

  getResourcesIn() {
    this.dashboardService.getResourcesIn(this._user.company.id)
      .subscribe(res => {
        const resIn = res;
        //This is to reomve duplicates.
        this.resourcesIn = Array.from(resIn.reduce((m, t) => m.set(t.resourceListing.id, t), new Map()).values());
        this.resourcesIn.forEach(item => {
          item.attributeString = item.resourceListing.attributeString;
          item.resourceOffers.forEach(offer => {
            offer.offer = offer.offer === '0' ? 'AU $ FREE' : 'AU $ ' + offer.offer;
          });
        });
      });
  }

  getAttributesString(item: any) {
    let attrString: string = '';
    item.forEach(element => {
      attrString += element + ', ';
    });

    return attrString.slice(0, -1);
  }

  getActiveDuration( date ) {
    // Get 1 day in milliseconds
    const one_day = 1000 * 60 * 60 * 24;
    // Convert both dates to milliseconds
    const dateNow = new Date;
    const dateNow_ms = dateNow.getTime();
    const date_ms = new Date(date).getTime();
    // Calculate the difference in milliseconds
    const difference_ms = dateNow_ms - date_ms;
    const dateReturn = Math.round(difference_ms / one_day);
    // Convert back to days and return
    return dateReturn === 0 ? 1 : dateReturn;
  }

  navigateToAddResource() {
    this.router.navigate(['dash/addresource']);
  }

  navigateToUpdateResource(id: any) {
    this.router.navigate(['dash/addresource',id]);
  }

  navigateToListing(id: any) {
    this.router.navigate(['marketplace/resource', id ]);
  }

}
