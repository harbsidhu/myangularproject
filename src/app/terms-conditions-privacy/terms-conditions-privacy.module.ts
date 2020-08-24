import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsPrivacyRoutingModule } from './terms-conditions-privacy-routing.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { TermsConditionsPrivacyComponent } from './terms-conditions-privacy.component';
import { TncComponent } from './tnc/tnc.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  declarations: [TermsConditionsPrivacyComponent, TncComponent, PrivacyComponent],
  imports: [
    CommonModule,
    ThemeModule,
    TermsConditionsPrivacyRoutingModule,
    NgxExtendedPdfViewerModule,
  ],
})
export class TermsConditionsPrivacyModule { }
