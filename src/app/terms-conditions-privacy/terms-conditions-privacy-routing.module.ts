import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsConditionsPrivacyComponent } from './terms-conditions-privacy.component';
import { TncComponent } from './tnc/tnc.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [{
  path: '',
  component: TermsConditionsPrivacyComponent,
  children: [
    {
      path: 'tnc',
      component: TncComponent ,
    },
    {
      path: 'privacy',
      component:  PrivacyComponent,
    },
    {
      path: '',
      redirectTo: 'tnc',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsConditionsPrivacyRoutingModule { }
