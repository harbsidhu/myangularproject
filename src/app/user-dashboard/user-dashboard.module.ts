import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThemeModule } from '../@theme/theme.module';
import { PagesModule } from '../pages/pages.module';
import { LayoutModule } from '../pages/layout/layout.module';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilePickerModule} from 'ngx-awesome-uploader';
// tslint:disable-next-line: max-line-length
import { NbMenuModule, NbCardModule, NbIconModule, NbTreeGridModule, NbInputModule, NbButtonModule, NbAccordionModule, NbTooltipModule,
    NbSelectModule, NbCheckboxModule,NbDatepickerModule } from '@nebular/theme';
import { OfferGridComponent } from './offer-grid/offer-grid.component';
import { AgGridModule } from '../../../node_modules/ag-grid-angular';
import { OfferGridActionComponent } from './offer-grid-action/offer-grid-action.component';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceAddComponent } from './resource-add/resource-add.component';
import { SharedModule } from '../shared/shared.module';
import { CouncilDashboardComponent } from './council-dashboard/council-dashboard.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { TwodecimalnumberDirective } from './directives/twodecimalnumber.directive';
import { AuthGuard } from '../_shared/authGuard';
import { ResourceinGridComponent } from './resourcein-grid/resourcein-grid.component';
import { ResourceinGridActionComponent } from './resourcein-grid-action/resourcein-grid-action.component';

import { ResourceInOfferGridComponent } from './resource-in-offer-grid/resource-in-offer-grid.component';
import { ResourceOutOfferGridComponent } from './resource-out-offer-grid/resource-out-offer-grid.component';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { ngfModule} from 'angular-file';
// tslint:disable-next-line: import-spacing
import { CouncilDashboardMatchesViewActionComponent }
        from './council-dashboard-matches-view-action/council-dashboard-matches-view-action.component';
// import { AppModule } from '../app.module';
import { PipesModule } from '../_shared/pipes/pipes.module';
import { HomeModule } from '../home/home.module';
import { ChatModule } from '../chat/';
import { ModalOverlaysModule } from '../pages/modal-overlays/modal-overlays.module';

@NgModule({
  declarations: [
    UserDashboardComponent,
    DashboardComponent,
    OfferGridComponent,
    OfferGridActionComponent,
    ResourcesComponent,
    ResourceAddComponent,
    CouncilDashboardComponent,
    TwodecimalnumberDirective,
    ResourceinGridComponent,
    ResourceinGridActionComponent,
    ResourceInOfferGridComponent,
    ResourceOutOfferGridComponent,
    CouncilDashboardMatchesViewActionComponent,
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    ThemeModule,
    PagesModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NbMenuModule,
    NbCardModule,
    NbIconModule,
    NbTreeGridModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    NbAccordionModule,
    NbTooltipModule,
    NbSelectModule,
    NbDatepickerModule,
    UiSwitchModule,
    FilePickerModule,
    AgGridModule.withComponents([
      OfferGridActionComponent,
      ResourceinGridActionComponent,
    CouncilDashboardMatchesViewActionComponent]),
    SharedModule,
    AngularMultiSelectModule,
    NgxTypeaheadModule,
    ngfModule,
    PipesModule,
    HomeModule,
    ChatModule,
    ModalOverlaysModule
    ],
  entryComponents: [OfferGridActionComponent],
  exports: [TwodecimalnumberDirective],
  providers: [AuthGuard],
})
export class UserDashboardModule { }
