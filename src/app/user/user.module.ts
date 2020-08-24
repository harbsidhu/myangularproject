import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { PagesModule } from '../pages/pages.module';
import { LayoutModule } from '../pages/layout/layout.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserComponent } from './user.component';
import { NbStepperModule, NbCardModule, NbButtonModule, NbSelectModule, NbRadioModule, NbCheckboxModule,
    NbAccordionModule, NbIconModule, NbTooltipModule, NbDialogModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap';
import { UserInterestsComponent } from './user-interests/user-interests.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '../_shared/authGuard';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { TreeModule } from 'angular-tree-component';
import { HomeModule } from '../home/home.module';
import { UserWelcomeBackComponent } from './user-welcome-back/user-welcome-back.component';
import { PipesModule } from '../_shared/pipes/pipes.module';
// tslint:disable-next-line: max-line-length
import { MigrationResourceConfirmationComponent } from './migration-resource-confirmation/migration-resource-confirmation.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { StripepaymentComponent } from './stripepayment/stripepayment.component';
@NgModule({
  declarations: [
    UserRegistrationComponent,
    UserComponent,
    UserInterestsComponent,
    UserProfileComponent,
    UserProfileUpdateComponent,
    UserWelcomeBackComponent,
    MigrationResourceConfirmationComponent,
    StripepaymentComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbRadioModule,
    NbCheckboxModule,
    NbAccordionModule,
    NbIconModule,
    NbTooltipModule,
    NbSpinnerModule,
    ThemeModule,
    PagesModule,
    LayoutModule,
    NbStepperModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    BsDropdownModule.forRoot(),
    AngularMultiSelectModule,
    TreeModule,
    HomeModule,
    PipesModule,
    NgxGalleryModule,
  ],
  entryComponents: [StripepaymentComponent],
  providers: [AuthGuard],
})
export class UserModule { }
