import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-council-dashboard-matches-view-action',
  templateUrl: './council-dashboard-matches-view-action.component.html',
  styleUrls: ['./council-dashboard-matches-view-action.component.scss']
})
export class CouncilDashboardMatchesViewActionComponent implements OnInit {
  data: any;
  params: any;

  constructor(private router: Router) { }

  agInit(params) {
    this.params = params;
    this.data =  params.value;
    }

    viewListing() {
      this.router.navigate(['marketplace/resource/' + this.params.data.id]);
    }

  ngOnInit() {
  }

  refresh(params: any): boolean {
    return false;
  }

}
