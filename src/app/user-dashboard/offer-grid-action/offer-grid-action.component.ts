import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResourceOfferService } from '../../_services/resourceOffer.service';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'ngx-offer-grid-action',
  templateUrl: './offer-grid-action.component.html',
  styleUrls: ['./offer-grid-action.component.scss'],
})
export class OfferGridActionComponent implements ICellRendererAngularComp {
  refresh(params: any): boolean {
    return false;
  }
  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {

  }

  data: any;
params: any;

public showControls: boolean = true;

private listingActive: boolean;
private offerActive: boolean;
private offerRejected: boolean;

  constructor(
    private resourceOfferService: ResourceOfferService,
    private router: Router,
    private dialogService: NbDialogService,
    private messageService: MessageService) { }

  agInit(params) {
    this.params = params;
    this.data =  params.value;
  
    this.listingActive = !this.params.data.listingApproved;
    this.offerActive = this.params.data.active;
    this.offerRejected = this.params.data.rejected;
    this.setControlVisibility();
    }

    setControlVisibility() {
      if (this.listingActive && this.offerActive) {
        if (!this.offerRejected) {
          this.showControls = true;
        } else {
          this.showControls = false;
        }
      } else if (!this.listingActive || !this.offerActive) {
        this.showControls = false;
      }
    }

    openChatDialog() {
     this.params.openChat(this.params.data.listingId,this.params.data.listingIdString + " - " + this.params.data.buyer,this.params.data.buyerId,this.params.openChatEmitter);
    }
    
    openDialog(dialog: TemplateRef<any>) {
      this.dialogService.open(
        dialog);
    }

    approveOffer() {
      const id = this.params.data.id;
      this.resourceOfferService.approveOffer(id)
      .subscribe(res => {
        this.messageService.showSuccessToast('Success', 'Offer has been Approved.');
        this.data = res;
        this.params.api.refreshCells();
        let url = this.router.url;
        this.router.navigateByUrl('blank').then(() => {
          this.router.navigate([url]);
        });
      });
    }

    rejectOffer() {
      const id = this.params.data.id;
      this.resourceOfferService.rejectOffer(id)
      .subscribe(res => {
        this.data = res;
        this.params.api.refreshCells();
        let url = this.router.url;
        this.router.navigateByUrl('blank').then(() => {
         this.router.navigate([url]);
        });
      });
    }
}
