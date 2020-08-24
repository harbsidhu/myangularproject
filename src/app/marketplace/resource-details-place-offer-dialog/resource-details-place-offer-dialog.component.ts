import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-resource-details-place-offer-dialog',
  templateUrl: './resource-details-place-offer-dialog.component.html',
  styleUrls: ['./resource-details-place-offer-dialog.component.scss'],
})
export class ResourceDetailsPlaceOfferDialogComponent implements OnInit {

  constructor(protected ref: NbDialogRef<ResourceDetailsPlaceOfferDialogComponent>) { }

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
