import { Component, OnInit, Input } from '@angular/core';
import { OfferGridActionComponent } from '../offer-grid-action/offer-grid-action.component';
import { DateFormatPipe } from '../../_shared/pipes/date-format.pipe';

@Component({
  selector: 'ngx-resource-out-offer-grid',
  templateUrl: './resource-out-offer-grid.component.html',
  styleUrls: ['./resource-out-offer-grid.component.scss'],
})
export class ResourceOutOfferGridComponent implements OnInit {

  public columnDefs;
  public rowClassRules;
  private gridApi;
  private gridColumnApi;
  private listingActive: any = false;

  @Input() offerData: any;
  @Input() listing: any;

  constructor(private _dateFormatPipe: DateFormatPipe) {
    this.columnDefs = [
      { headerName: 'ID', field: 'listingIdString', sortable: true, filter: true },
      { headerName: 'Timestamp', field: 'timestamp', sortable: true, filter: true,
      cellRenderer: (data) => {
        return data.value ? this._dateFormatPipe.transform(new Date(data.value)).toString() : '';
   } },
      { headerName: 'Buyer', field: 'buyer', sortable: true, filter: true },
      { headerName: 'Location', field: 'buyerLocation', sortable: true, filter: true },
      { headerName: 'Industry', field: 'industry', sortable: true, filter: true },
      { headerName: 'Offer', field: 'offer', sortable: true, filter: true },
      { headerName: 'CO2 Saving', field: 'co2Saving', sortable: true, filter: true },
      { headerName: 'Action', cellRendererFramework: OfferGridActionComponent,
                    cellRendererParams: {
                      },
     },
    ];

    this.rowClassRules = {
        'offer-approved': function (params) { return params.data.active === false && params.data.rejected === false; },
      };

   }

  ngOnInit() {
  }


  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  defaultColDef = {
    resizable: true,
  };

}
