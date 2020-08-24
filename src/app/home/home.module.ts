import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AspireComponent } from './aspire/aspire.component';
import { PagesModule } from '../pages/pages.module';
import { ThemeModule } from '../@theme/theme.module';
import { LayoutModule } from '../pages/layout/layout.module';
import { NbCardModule, NbCheckboxModule, NbButtonModule } from '@nebular/theme';
import { ForgotPasswordComponent } from '../@theme/components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ContactusComponent } from './contactus/contactus.component';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [HomeComponent, AspireComponent, ForgotPasswordComponent, ContactusComponent,
     AccountConfirmationComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    PagesModule,
    ThemeModule,
    NbCardModule,
    NbCheckboxModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
  ],
})
export class HomeModule {
 }
