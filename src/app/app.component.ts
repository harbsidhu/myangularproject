/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, HostListener } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbIconLibraries } from '@nebular/theme';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';

declare let gtag: Function;

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;

  constructor(private analytics: AnalyticsService, private iconLibraries: NbIconLibraries, public router: Router) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          gtag('config', environment.googleAnalyticsKey,
                {
                  'page_path': event.urlAfterRedirects,
                },
               );
       }
    });

    this.iconLibraries.registerFontPack('solid', {packClass: 'fas', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('regular', {packClass: 'far', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('light', {packClass: 'fal', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('duotone', {packClass: 'fad', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('brands', {packClass: 'fab', iconClassPrefix: 'fa'});

    this.iconLibraries.setDefaultPack('solid');
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }

  // Scroll to Top Code

  @HostListener('window:scroll', [])
    onWindowScroll() {
      if (( window.pageYOffset || document.documentElement.scrollTop
        || document.body.scrollTop) > this.showScrollHeight) {
          this.showScroll = true;
      } else if ( this.showScroll &&
        (window.pageYOffset || document.documentElement.scrollTop
          || document.body.scrollTop) < this.hideScrollHeight) {
        this.showScroll = false;
      }
    }

    scrollToTop() {
      (function smoothscroll()
      { const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - (currentScroll / 5));
        }
      })();
    }

}
