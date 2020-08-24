/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StarRatingModule } from 'angular-star-rating';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import {Ng2CompleterModule} from 'ng2-completer';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SharedModule } from './shared/shared.module';
import { AbnService } from './_services/abn.service';
import { ApiCallService } from './_services/apiCall.service';
import { UserService } from './_services/user.service';
import { CompanyService } from './_services/company.service';
import { AuthCallService } from './_services/authcall.service';
import { StorageService } from './_services/storage.service';
import { ParameterService } from './_services/parameter.service';
import { MasterdataService } from './_services/masterdata.service';
import { MenuService } from './_services/menu.service';
import { PaymentService } from './_services/payment.service';
import { MessageService } from './_services/message.service';
import { ResourceService } from './_services/resource.service';
import { ResourceListingService } from './_services/resourceListing.service';
import { ResourceOfferService } from './_services/resourceOffer.service';
import { DashboardService } from './_services/dashboard.service';
import { AuthRequestInterceptor } from './_shared/authRequestInterceptor';
import { AuthErrorHandler } from './_shared/authErrorHandler';
import { AuthGuard } from './_shared/authGuard';
import { AuthService } from './_services/auth.service';
import { ImageService } from './_services/image.service';
import { CouncilDashboardService } from './_services/councilDashboard.service';
import { DateFormatPipe } from './_shared/pipes/date-format.pipe';
import { TermsConditionsPrivacyModule } from './terms-conditions-privacy/terms-conditions-privacy.module';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MarketplaceModule,
    TermsConditionsPrivacyModule,
    ThemeModule.forRoot(),
    StarRatingModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    Ng2CompleterModule,
    NgxTypeaheadModule,
    NgxExtendedPdfViewerModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ApiCallService,
    AbnService,
    UserService,
    CompanyService,
    AuthCallService,
    StorageService,
    ParameterService,
    MasterdataService,
    MenuService,
    PaymentService,
    MessageService,
    ResourceService,
    ResourceListingService,
    ResourceOfferService,
    DashboardService,
    AuthService,
    AuthGuard,
    ImageService,
    DateFormatPipe,
    CouncilDashboardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthRequestInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
