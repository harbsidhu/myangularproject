import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceAddComponent } from './resource-add/resource-add.component';
import { CouncilDashboardComponent } from './council-dashboard/council-dashboard.component';
import { AuthGuard } from '../_shared/authGuard';
import { PageNotFoundComponent } from '../home/page-not-found/page-not-found.component';

const routes: Routes = [{
  path: '',
  component: UserDashboardComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'council',
      component: CouncilDashboardComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'resources',
      component: ResourcesComponent,
      children: [
        {
          path: 'add',
          component: ResourceAddComponent,
          canActivate: [AuthGuard],
        },
      ],
    },
    {
      path: 'addresource/:id',
      component: ResourceAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'addresource',
      component: ResourceAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: '',
      redirectTo: 'dashboard',
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
export class UserDashboardRoutingModule { }
