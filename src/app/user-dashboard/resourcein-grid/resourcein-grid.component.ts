import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { ResourceOfferService } from '../../_services/resourceOffer.service';
import { StorageService } from '../../_services/storage.service';
import { User } from '../../_models/user';
import { ResourceinGridActionComponent } from '../resourcein-grid-action/resourcein-grid-action.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-resourcein-grid',
  templateUrl: './resourcein-grid.component.html',
  styleUrls: ['./resourcein-grid.component.scss']
})
export class ResourceinGridComponent implements OnInit {
  @Output() public openChatEmitter = new EventEmitter();

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


  constructor(private resourceOfferService: ResourceOfferService,
    private storageService: StorageService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'listingIdString', sortable: true, filter: true, width: 120 },
      { headerName: 'Listing', field: 'material', sortable: true, filter: true, width: 200 },
      { headerName: 'Pricing', field: 'pricing', sortable: true, filter: true },
      { headerName: 'List Price', field: 'listingPrice', sortable: true, filter: true },
      {
        headerName: 'Action', field: 'act',
        cellRendererFramework: ResourceinGridActionComponent,
        cellRendererParams: {          
          openChat: this.openChat,
          openChatEmitter: this.openChatEmitter
        }
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
    this.resourceOfferService.getResourcesInByCompanyForGrid(this._user.company.id)
      .subscribe(res => {
        let resourcesIn = res;
         //This is to reomve duplicates.
         this.offerData = Array.from(resourcesIn.reduce((m, t) => m.set(t.id, t), new Map()).values());

         this.offerData = this.offerData.sort((a,b) => a.createdDate > b.createdDate ? -1 : 1)
        
      });
  }

  navigateToResources() {
    this.router.navigate(['dash/resources']);
  }

  openChat(listingId: number,listingIdString: string, toId: number,openChatEmitter: any){
    this.openChatEmitter.emit({listingId,listingIdString,toId});
  }

}
