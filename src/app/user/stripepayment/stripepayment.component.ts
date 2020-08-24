import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { User } from '../../_models/user';
import { StripeBillingDetails } from '../../_models/stripeBillingDetails';
import { environment } from '../../../environments/environment';
declare var Stripe: any;

@Component({
  selector: 'ngx-stripepayment-component',
  templateUrl: './stripepayment.component.html',
  styleUrls: ['./stripepayment.component.scss'],
})
export class StripepaymentComponent implements OnInit {
  @Input() billing_details: StripeBillingDetails;
  @Input() transactionToken: string;
  @Input() paymentAmount: string;

  constructor(protected ref: NbDialogRef<StripepaymentComponent>) { }

  public paymentResult: string;
  loading: true;
  stripe: any;
  card: any;

  ngOnInit(): void {
    this.paymentResult = 'payment in progress. PLease do not close this window or click back button of browser.';
    this.stripe = Stripe(environment.stripeKey);
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(document.getElementById('cardElement'));
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', event => {
      event.preventDefault();
    });
  }

  submitPayment(this: any) {
    const that = this;
    this.loading = true;
    this.stripe.confirmCardPayment(this.transactionToken, {
      payment_method: {
        card: that.card,
        billing_details: that.billing_details,
      },
    }).then(result => {
      if (result.error) {
        this.loading = false;
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          this.loading = false;
          that.paymentResult  = 'Complete successfully';
          that.ref.close(true);
        }
      }
    });
}

cancel() {
  console.log('cancel payment');
  this.ref.close(false);
}

async delay(ms: number) {
  await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
}

}
