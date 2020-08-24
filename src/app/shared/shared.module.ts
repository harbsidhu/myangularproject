import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './item-card/item-card.component';
import { NbCardModule, NbButtonModule, NbTooltipModule, NbCheckboxModule, NbRadioModule, NbSelectModule } from '@nebular/theme';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ItemCardComponent, SearchFilterComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbTooltipModule,
    NbCheckboxModule,
    NbRadioModule,
    FormsModule,
    NbSelectModule
  ],
  exports: [ItemCardComponent, SearchFilterComponent],
})
export class SharedModule { }
