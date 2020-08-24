import { Component, OnInit, Input } from '@angular/core';
import { DateFormatPipe } from '../../_shared/pipes/date-format.pipe';

@Component({
  selector: 'ngx-resource-in-offer-grid',
  templateUrl: './resource-in-offer-grid.component.html',
  styleUrls: ['./resource-in-offer-grid.component.scss']
})
export class ResourceInOfferGridComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  public columnDefs;
  
  @Input() offerData: any;

  constructor(private _dateFormatPipe: DateFormatPipe) {
    this.columnDefs = [
      { headerName: 'ID', field: 'listingIdString', sortable: true, filter: true },
      { headerName: 'Timestamp', field: 'timestamp', sortable: true, filter: true, 
      cellRenderer: (data) => {
        return data.value ? this._dateFormatPipe.transform(new Date(data.value)).toString() : '';
   } },
      { headerName: 'State', field: 'state', sortable: true, filter: true },
      { headerName: 'Offer', field: 'offer', sortable: true, filter: true },
      { headerName: 'Status', field: 'status', sortable: true, filter: true },
    ];
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
