import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketplaceComponent } from './marketplace.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { MatchesComponent } from './matches/matches.component';
import { PageNotFoundComponent } from '../home/page-not-found/page-not-found.component';

const routes: Routes = [{
  path: '',
  component: MarketplaceComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'resource/:id',
      component: ResourceDetailsComponent,
    },
    {
      path: 'matches',
      component: MatchesComponent,
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
export class MarketplaceRoutingModule { }
