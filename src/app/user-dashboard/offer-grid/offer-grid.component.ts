import { Component, OnInit } from '@angular/core';
import { OfferGridActionComponent } from '../offer-grid-action/offer-grid-action.component';
import { ResourceOfferService } from '../../_services/resourceOffer.service';
import { StorageService } from '../../_services/storage.service';
import { User } from '../../_models/user';
import { Router } from '@angular/router';
import { EventEmitter,Output } from '@angular/core'

@Component({
  selector: 'ngx-offer-grid',
  templateUrl: './offer-grid.component.html',
  styleUrls: ['./offer-grid.component.scss'],
})
export class OfferGridComponent implements OnInit {
  @Output() public openChatEmitter = new EventEmitter()

  private gridApi;
  private gridColumnApi;
  public columnDefs;
  public _user: User;

  public offerData: any;

  gridOptions = {
    columnDefs: this.columnDefs,
    rowData: null,
    enableColResize: true,
  };

  defaultColDef = {
    resizable: true,
  };

  constructor(
    private resourceOfferService: ResourceOfferService,
    private storageService: StorageService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'listingIdString', sortable: true, filter: true, width: 120 },
      { headerName: 'Listing', field: 'listing', sortable: true, filter: true, width: 200 },
      { headerName: 'Buyer', field: 'buyer', sortable: true, filter: true },
      { headerName: 'Location', field: 'buyerLocation', sortable: true, filter: true },
      { headerName: 'Offer', field: 'offer', sortable: true, filter: true },
      {
        headerName: 'Action', field: 'Action',
        cellRendererFramework: OfferGridActionComponent,
        cellRendererParams: {
          inRouterLink: '/listing',
          openChat: this.openChat,
          openChatEmitter: this.openChatEmitter
        },
      },
    ];
  }

  ngOnInit() {
    this._user = this.storageService.getItem('user');
    this.getOfferGridData();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  getOfferGridData() {
    this.resourceOfferService.getOffersForGridsByCompany(this._user.company.id)
      .subscribe(res => {
        const offerDataout = res;
        this.offerData = Array.from(offerDataout.reduce((m, t) => m.set(t.id, t), new Map()).values());
        this.offerData = this.offerData.sort((a,b) => a.createdDate > b.createdDate ? -1 : 1)
      });
  }

  openChat(listingId: number,listingIdString: string, toId: number,openChatEmitter: any){
    this.openChatEmitter.emit({listingId,listingIdString,toId});
  }

  navigateToResources() {
    this.router.navigate(['dash/resources']);
  }
}
