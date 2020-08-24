import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-resource-details-accept-offer-dialog',
  templateUrl: './resource-details-accept-offer-dialog.component.html',
  styleUrls: ['./resource-details-accept-offer-dialog.component.scss'],
})
export class ResourceDetailsAcceptOfferDialogComponent implements OnInit {

  constructor(protected ref: NbDialogRef<ResourceDetailsAcceptOfferDialogComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.ref.close(false);
  }

  submit() {
    this.ref.close(true);
  }

  openTnC() {
    window.open('docs/tnc');
  }

}
