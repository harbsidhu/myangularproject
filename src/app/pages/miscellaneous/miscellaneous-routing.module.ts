import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MiscellaneousComponent } from './miscellaneous.component';
import { PageNotFoundComponent } from '../../home/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: MiscellaneousComponent,
    children: [
      {
        path: '404',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscellaneousRoutingModule {
}
