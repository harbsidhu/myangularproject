import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('../app/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'marketplace',
    loadChildren: () => import('../app/marketplace/marketplace.module')
    .then(m => m.MarketplaceModule),
  },
  {
    path: 'user',
    loadChildren: () => import('../app/user/user.module')
    .then(m => m.UserModule),
  },
  {
    path: 'home',
    loadChildren: () => import('../app/home/home.module')
    .then(m => m.HomeModule),
  },
  {
    path: 'dash',
    loadChildren: () => import('../app/user-dashboard/user-dashboard.module')
    .then(m => m.UserDashboardModule),
  },
  {
    path: 'docs',
    loadChildren: () => import('../app/terms-conditions-privacy/terms-conditions-privacy.module')
    .then(m => m.TermsConditionsPrivacyModule),
  },
  { path: '', redirectTo: 'dash/dashboard', pathMatch: 'full' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
