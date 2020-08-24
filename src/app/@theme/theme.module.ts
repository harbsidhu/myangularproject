import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbCheckboxModule,
  NbWindowModule,
  NbCardModule,
  NbInputModule,
  NbDialogModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  TinyMCEComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  OneColumnNoMenuLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';
// tslint:disable-next-line: max-line-length
import { LandingComponent } from './layouts/landing/landing.layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OneColumnNoFooterComponent } from './layouts/one-column-no-footer/one-column-no-footer.component';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbCheckboxModule,
  NbWindowModule,
  NbDialogModule,
  NbCardModule,
  NbInputModule,
  NbSpinnerModule,
  FormsModule,
  ReactiveFormsModule,
  Ng2CompleterModule,
  NgxTypeaheadModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  OneColumnNoMenuLayoutComponent,
  OneColumnNoFooterComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  LandingComponent,
  LoginComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES, ResetPasswordComponent, OneColumnNoFooterComponent ],
  entryComponents: [LoginComponent],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'aspire',
          },
          [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ],
        ).providers,
        HeaderComponent,
      ],
    };
  }
}
