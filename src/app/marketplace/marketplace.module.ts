import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../@theme/theme.module';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatchesComponent } from './matches/matches.component';
import { PagesModule } from '../pages/pages.module';
import { LayoutModule } from '../pages/layout/layout.module';
import { NbCardModule, NbIconModule, NbButtonModule, NbSidebarModule, NbCheckboxModule,
    NbRadioModule,NbSelectModule, NbTooltipModule, NbListModule } from '@nebular/theme';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { NbMenuModule } from '@nebular/theme';
import { StarRatingModule } from 'angular-star-rating';
import { SharedModule } from '../shared/shared.module';
import { UserDashboardModule } from '../user-dashboard/user-dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTypeaheadModule } from 'ngx-typeahead';
// tslint:disable-next-line: max-line-length
import { ResourceDetailsAcceptOfferDialogComponent } from './resource-details-accept-offer-dialog/resource-details-accept-offer-dialog.component';
import { ResourceDetailsPlaceOfferDialogComponent } from './resource-details-place-offer-dialog/resource-details-place-offer-dialog.component';
import { HomeModule } from '../home/home.module';
import { ChatModule } from '../chat/';

@NgModule({
  declarations: [MarketplaceComponent, DashboardComponent, ResourceDetailsComponent, MatchesComponent,
    ResourceDetailsAcceptOfferDialogComponent, ResourceDetailsPlaceOfferDialogComponent],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    ThemeModule,
    FormsModule,
    PagesModule,
    LayoutModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbCheckboxModule,
    NbRadioModule,
    NbMenuModule,
    NbTooltipModule,
    NgxGalleryModule,
    NbSidebarModule,
    NbListModule,
    StarRatingModule,
    SharedModule,
    UserDashboardModule,
    NgxTypeaheadModule,
    ReactiveFormsModule,
    HomeModule,
    NbSelectModule,
    ChatModule
  ],
  entryComponents: [ResourceDetailsAcceptOfferDialogComponent, ResourceDetailsPlaceOfferDialogComponent ],
})
export class MarketplaceModule { }
