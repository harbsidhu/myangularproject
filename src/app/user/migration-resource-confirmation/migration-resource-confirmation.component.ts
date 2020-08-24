import { Component, OnInit, TemplateRef } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import { ResourceOutDashboard } from '../../_models/resourcesOutDashBoard';
import { User } from '../../_models/user';
import { StorageService } from '../../_services/storage.service';
import { ResourceListingService } from '../../_services/resourceListing.service';
import { CompanyService } from '../../_services/company.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../@theme/components';
import { trigger, transition, animate, style } from '@angular/animations';
import { ResourceListing } from '../../_models/resourceListing';
import { NgxGalleryAnimation, NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { environment } from '../../../environments/environment';
import { ResourceListingWithOfferCount } from '../../_models/resourceListingWithOfferCount';
import { ImageService } from '../../_services/image.service';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-migration-resource-confirmation',
  templateUrl: './migration-resource-confirmation.component.html',
  styleUrls: ['./migration-resource-confirmation.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('1000ms ease', style({transform: 'translateX(0%)'}))
      ]),
    ])
  ]
})
export class MigrationResourceConfirmationComponent implements OnInit {

  public resourcesOut: Array<ResourceOutDashboard> = new Array;
  public IsResourceConfirmationDone = false;
  public currentIndex = 0;
  public _resourceListing: ResourceListing;
  public _listingPrice: number;
  public _offerPrice: number;
  public _resourceListingWithOfferCount: ResourceListingWithOfferCount;
  public _listingId: string;
  public _isFree: boolean = false;
  public _isSale: boolean = false;
  public _isDisposable: boolean = false;
  public _imageData: any;

  private _apiLink: string;
  private _user: User;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private dashboardService: DashboardService,
    private resourceListingService: ResourceListingService,
    private companyService: CompanyService,
    private router: Router,
    private storageService: StorageService,
    private headerComp: HeaderComponent,
    private imageService: ImageService,
    private dialogService: NbDialogService) {
  }

  ngOnInit() {
    this._user = this.storageService.getItem('user');
    this.getResourcesOut();

    //set api url
    this._apiLink = environment.base_url + '/api/image/';

    this.galleryOptions =
      [
        {
          width: '420px',
          height: '400px',
          thumbnailsColumns: 3,
          imageAnimation: NgxGalleryAnimation.Slide,
          imageArrowsAutoHide: true, thumbnailsArrowsAutoHide: true,
          arrowPrevIcon: 'fas fa-angle-left',
          arrowNextIcon: 'fas fa-angle-right',
          previewCloseOnEsc : true, previewCloseOnClick: true
        },
        {
          breakpoint: 450,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20,
        },
        {
          breakpoint: 400,
          preview: false,
        },
      ];
  }

  getResourcesOut() {
    this.dashboardService.getResourcesOut(this._user.company.id)
      .subscribe(res => {
        let list: Array<ResourceOutDashboard> = new Array;
        list = res;
        this.resourcesOut = list.filter(x => x.resourceListing.isResourceMigrated === false);
        this.IsResourceConfirmationDone = this.resourcesOut.length === 0;
        this.resourcesOut.forEach(item => {
          item.attributeString = item.resourceListing.attributeString;
          item.resourceOffers.forEach(offer => {
            offer.offer = offer.offer === '0' ? 'AU $ FREE' : 'AU $ ' + offer.offer;
          });
        });
      });
  }

  getActiveDuration(date) {
    // Get 1 day in milliseconds
    const one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const dateNow = new Date;
    const dateNow_ms = dateNow.getTime();
    const date_ms = new Date(date).getTime();

    // Calculate the difference in milliseconds
    const difference_ms = dateNow_ms - date_ms;
    const dateReturn = Math.round(difference_ms / one_day);
    // Convert back to days and return
    return dateReturn === 0 ? 1 : dateReturn;
  }

  setResourceAsActive(id: any, index: any) {
    this.resourceListingService.markAsActive(id)
      .subscribe(res => {
        if (res) {
          this.setNextIndex(index);
        }
      });
  }

  setResourceAsInActive(id: any, index: any) {
    this.resourceListingService.markAsInActive(id)
      .subscribe(res => {
        if (res) {
          this.setNextIndex(index);
        }
      });
  }

  setNextIndex(index: number) {
    this.currentIndex = index + 1;
    this.IsResourceConfirmationDone = this.resourcesOut.length === this.currentIndex;
  }

  setComapanyAsMigrated() {
    this.companyService.markCompanyAsMigrated(this._user.company.id)
    .subscribe(res => {
      if (res) {
        const userMenu = this.storageService.getItem('menuRetain');
        this.storageService.store('menu', userMenu);
        this.headerComp.Menus = userMenu;
        this.navigateToDashBaord();
      }
    }
    , error => {
      console.log(error);
    });
  }

  navigateToDashBaord() {
    this.router.navigate(['dash/dashboard']);
  }

  navigateToListing(respurcedetails: TemplateRef<any>, listing) {
    this.dialogService.open(respurcedetails)
    .onClose.subscribe(res => {
    });
    this.getResourceListingById(parseInt(listing.id, 10));
    this.getListingImages(parseInt(listing.id, 10));
  }

  getResourceListingById(id: number) {
    this.resourceListingService.getResourceListingById(id)
      .subscribe(res => {
        console.log(JSON.stringify(res));
        this._resourceListingWithOfferCount = res;
        this._resourceListing = this._resourceListingWithOfferCount.resourceListing;
        this.setPriceLabel();
      });
  }

  setPriceLabel() {
    switch (this._resourceListing.resourceListType.name) {
      case 'I am paying for the disposal.':
        this._listingPrice = this._resourceListing.disposalPrice;
        this._isDisposable = true;
        this._isSale = false;
        this._isFree = false;
        break;
      case 'I am selling.':
        this._listingPrice = this._resourceListing.sellPrice;
        this._isDisposable = false;
        this._isSale = true;
        this._isFree = false;
        break;
      case 'I am giving it away for free.':
        this._listingPrice = 0;
        this._isDisposable = false;
        this._isSale = false;
        this._isFree = true;
        break;
    }
  }

  getListingImages(id: number) {
    this.imageService.getImagesByListing(id).
      subscribe(res => {
        this._imageData = res;
        this.createGalaryImages();
      });
  }

  createGalaryImages() {
    this.galleryImages = new Array();

    if (this._imageData.length > 0) {
      this._imageData.forEach(item => {
        const path1 = this._apiLink + item.name;
        const image = {
          small: path1,
          medium: path1,
          big: path1,
        };

        this.galleryImages.push(image);
        console.log(JSON.stringify(this.galleryImages));
      });
    } else {
      const img = {
        small: '../../../../assets/images/item_bg.png',
        medium: '../../../../assets/images/item_bg.png',
        big: '../../../../assets/images/item_bg.png',
      };
      this.galleryImages.push(img);
    }
  }
}
