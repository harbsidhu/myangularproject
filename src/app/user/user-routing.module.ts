import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserInterestsComponent } from './user-interests/user-interests.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { AuthGuard } from '../_shared/authGuard';
import { PageNotFoundComponent } from '../home/page-not-found/page-not-found.component';
import { UserWelcomeBackComponent } from './user-welcome-back/user-welcome-back.component';
// tslint:disable-next-line: max-line-length
import { MigrationResourceConfirmationComponent } from './migration-resource-confirmation/migration-resource-confirmation.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [
    {
      path: 'registration',
      component: UserRegistrationComponent,
    },
    {
      path: 'profile',
      component: UserProfileComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'profile/update',
      component: UserProfileUpdateComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'interests',
      component: UserInterestsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'welcomeback',
      component: UserWelcomeBackComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'confirmresource',
      component: MigrationResourceConfirmationComponent,
      canActivate: [AuthGuard],
    },
    {
      path: '',
      redirectTo: 'registration',
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
export class UserRoutingModule { }
