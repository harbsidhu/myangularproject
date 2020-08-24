import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-resourcein-grid-action',
  templateUrl: './resourcein-grid-action.component.html',
  styleUrls: ['./resourcein-grid-action.component.scss']
})
export class ResourceinGridActionComponent implements OnInit, ICellRendererAngularComp {

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

  openChatDialog() {
    this.params.openChat(this.params.data.listingId,this.params.data.listingIdString + " - " + this.params.data.material,this.params.data.sellerId,this.params.openChatEmitter);
   }

  refresh(params: any): boolean {
    return false;
  }

}
