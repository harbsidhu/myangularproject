import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AspireComponent } from './aspire/aspire.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../@theme/components/login/login.component';
import { ResetPasswordComponent } from '../@theme/reset-password/reset-password.component';
import { ForgotPasswordComponent } from '../@theme/components/forgot-password/forgot-password.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'aspire',
      component: AspireComponent,
    },
    {
      path: 'contactus',
      component: ContactusComponent,
    },
    {
      path: 'confirmation',
      component: AccountConfirmationComponent,
    },
    {
      path: 'confirmation/:key',
      component: AccountConfirmationComponent,
    },
    {
      path: 'confirmation/:id',
      component: AccountConfirmationComponent,
    },
    {
      path: 'auth/login',
      component: LoginComponent,
    },
    {
      path: 'auth/reset',
      component: ResetPasswordComponent,
    },
    {
      path: 'auth/forgotpassword',
      component: ForgotPasswordComponent,
    },
    {
      path: 'auth/reset/:token',
      component: ResetPasswordComponent,
    },
    {
      path: '',
      redirectTo: 'aspire',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: PageNotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
