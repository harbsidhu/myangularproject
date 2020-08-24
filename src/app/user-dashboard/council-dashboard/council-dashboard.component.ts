import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { CouncilDashboardService } from '../../_services/councilDashboard.service';
import { User } from '../../_models/user';
import { StorageService } from '../../_services/storage.service';
import { CompanyService } from '../../_services/company.service';
import { Address } from '../../_models/address';
import { DashboardService } from '../../_services/dashboard.service';
import { CouncilDashboardMatchesViewActionComponent } from '../council-dashboard-matches-view-action/council-dashboard-matches-view-action.component';

@Component({
  selector: 'ngx-council-dashboard',
  templateUrl: './council-dashboard.component.html',
  styleUrls: ['./council-dashboard.component.scss'],
})
export class CouncilDashboardComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  public columnDefs;

  public _user: User;
  public _userCompany: User;
  public companyData: any;
public matchesData: any;

  public companyPrimaryAddress: any;
  public columnDefsMatches: any;

  public companyAdditionalAddress: any[] = new Array();

  public isResourceClicked: boolean = false;

  gridOptions = {
    columnDefs: this.columnDefs,
    rowData: null,
    enableColResize: true,
   // rowDoubleClickedEvent: this.onRowDoubleClicked(event),
};

gridOptionsMatches = {
  columnDefs: this.columnDefsMatches,
  rowData: null,
  enableColResize: true,
 // rowDoubleClickedEvent: this.onRowDoubleClicked(event),
};

    defaultColDef = {
      resizable: true,
  };

  constructor(private router: Router,
    private dialogService: NbDialogService,
    private councilDashboardService: CouncilDashboardService,
    private storageService: StorageService,
    private companyService: CompanyService,
    private dashboardService: DashboardService) {
    this.columnDefs = [
      {headerName: 'Company', field: 'companyName', sortable: true, filter: true },
      {headerName: 'ABN', field: 'abn', sortable: true, filter: true, width: 120   },
      {headerName: 'Recycler', field: 'recycler', sortable: true, filter: true, width: 100  },
      {headerName: 'Name', field: 'name', sortable: true, filter: true, width: 80 },
      {headerName: 'Surname', field: 'surname', sortable: true, filter: true, width: 130 },
      {headerName: 'Email', field: 'email', sortable: true, filter: true, width: 200 },
      {headerName: 'Last Log in', field: 'lastLogin', sortable: true, filter: true, width: 120 },
      {headerName: 'Total Resource', field: 'totalResources', sortable: true, filter: true, width: 100 },
      {headerName: 'Total Matches', field: 'totalMatches', sortable: true, filter: true, width: 100 },
  ];

  this.columnDefsMatches = [
    {headerName: 'Resource', field: 'name', sortable: true, filter: true },
    {headerName: 'Type', field: 'type', sortable: true, filter: true, width: 120   },
    {headerName: 'Pricing', field: 'price', sortable: true, filter: true, width: 100  },
    {headerName: 'Listed', field: 'listedString', sortable: true, filter: true, width: 80 },
    {headerName: 'Completed', field: 'completedString', sortable: true, filter: true, width: 130 },
    {headerName: 'Duration on ASPIRE', field: 'duration', sortable: true, filter: true, width: 200 },
    {
      headerName: 'Action', field: 'act',
      cellRendererFramework: CouncilDashboardMatchesViewActionComponent,
    },,
];
}


  ngOnInit() {
    this._user = this.storageService.getItem('user');
    this.getGridData();
  }


  getGridData() {
    this.councilDashboardService.getCouncilDashboard(this._user.company.council.id).subscribe(
      res => {
        this.companyData = res.sort((a,b) => {
          if(a.companyName.trim().toLowerCase() > b.companyName.trim().toLowerCase()){return 1;}
          if(a.companyName.trim().toLowerCase() < b.companyName.trim().toLowerCase()){return -1;}
          return 0;
        }) ;
      }) ;
  }

  getMatchedData(id: number) {
    this.dashboardService.getResourceMatches(id, 100, 1, undefined, undefined, '').subscribe(
      res => {
        this.matchesData = res;
      });
  }

  onGridReady( params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    params.api.setDomLayout('autoHeight');
    }

    getCompanyDetails(id: string) {
      this.companyService.getCompanyForCouncil(id).subscribe(
        res => {
          this._userCompany = res;
          this.companyPrimaryAddress = this._userCompany.company.addresses.find(x => x.isPrimary === true).fullAddress;
          console.log(JSON.stringify(this.companyPrimaryAddress));
          this.companyAdditionalAddress = this._userCompany.company.addresses.filter(x => x.isPrimary !== true);
      });
    }

    goToResource() {
      this.router.navigate(['/marketplace/resource']);
    }

    onRowDoubleClicked(event) {
      if (event.data !== null) {
        let id = event.data.companyId;
        this.getCompanyDetails(id);
        this.getMatchedData(id);
        this.isResourceClicked = true;
      }
    }

    closeDialog(){
      this.isResourceClicked = false;
    }

}
