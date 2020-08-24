import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ResourceListing } from '../../_models/resourceListing';
import { ResourceListingService } from '../../_services/resourceListing.service';
import { ResourceOffer } from '../../_models/resourceOffer';
import { StorageService } from '../../_services/storage.service';
import { User } from '../../_models/user';
import { ResourceOfferService } from '../../_services/resourceOffer.service';
import { Company } from '../../_models/company';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { ResourceListingWithOfferCount } from '../../_models/resourceListingWithOfferCount';
import { NbDialogService } from '@nebular/theme';
import { ImageService } from '../../_services/image.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';
import { ResourceDetailsAcceptOfferDialogComponent } from '../resource-details-accept-offer-dialog/resource-details-accept-offer-dialog.component';
import { ResourceDetailsPlaceOfferDialogComponent } from '../resource-details-place-offer-dialog/resource-details-place-offer-dialog.component';
import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'ngx-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss'],
})
export class ResourceDetailsComponent implements OnInit {
  private _location: Location;
  public _resourceOffer: ResourceOffer = new ResourceOffer();
  public _listingPrice: number;
  public _offerPrice: number;
  public _resourceListingWithOfferCount: ResourceListingWithOfferCount;
  public _resourceListing: ResourceListing;
  public _user: User;
  public _listingId: string;
  public _isFree: boolean = false;
  public _isSale: boolean = false;
  public _isDisposable: boolean = false;
  private _apiLink: string;
  public _imageData: any;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  _isSellerView: boolean = false;
  public theme: string = "blue";
  chatTitle: string = "loading";

  constructor(
    private resourceListingService: ResourceListingService,
    private storageService: StorageService,
    private resourceOfferService: ResourceOfferService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private imageService: ImageService,
    private messageService: MessageService,
    private location: Location) {
    this._location = location;
  }

  ngOnInit(): void {
    this._user = this.storageService.getItem('user');
    const id = this.route.snapshot.paramMap.get('id');
    this._listingId = id;

    this.getResourceListingById(parseInt(id, 10));
    this.getListingImages(parseInt(id, 10));
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

  checkLogin(dialogLogin: TemplateRef<any>, offer: string) {
    let result: boolean;
    if (this._user !== null) {
      if (offer === 'accept') {
        this.dialogService.open(ResourceDetailsAcceptOfferDialogComponent)
        .onClose.subscribe(res => {
          result = res;
          if (result === true) {
            this.placeOffer();
          }
        });
      } else {
        this.dialogService.open(ResourceDetailsPlaceOfferDialogComponent)
        .onClose.subscribe(res => {
          result = res;
          if (result === true) {
            this.placeOffer();
          }
        });
      }

      if (result === true) {
        this.placeOffer();
      }
    } else {
      this.openDialog(dialogLogin);
    }
  }

  placeOffer() {
    this._resourceOffer.company = new Company();
    this._resourceOffer.company.id = this._resourceListing.companyId;
    this._resourceOffer.company.abn = 0;
    this._resourceOffer.resourceListing = new ResourceListing();
    this._resourceOffer.resourceListing.id = this._resourceListing.id;
    this._resourceOffer.offerCompany = new Company();
    this._resourceOffer.offerCompany.id = this._user.company.id;
    this._resourceOffer.offerCompany.abn = this._user.company.abn;
    this._resourceOffer.price = this._offerPrice;
    this._resourceOffer.active = true;
    this.resourceOfferService.createResourceOffer(this._resourceOffer)
      .subscribe(res => {
        this.messageService.showSuccessToast('Success', 'Offer has been submitted to seller.');
        this.navigateToMarketPlace();
      });
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog);
  }

  navigateToMarketPlace() {
    this.router.navigate(['marketplace']);
  }

  navigateToLogin() {
    this.router.navigate(['home']);
  }

  navigateToCreateUser() {
    this.router.navigate(['user/registration']);
  }

  getResourceListingById(id: number) {
    this.resourceListingService.getResourceListingById(id)
      .subscribe(res => {       
        this._resourceListingWithOfferCount = res;
        this._resourceListing = this._resourceListingWithOfferCount.resourceListing;
        this._isSellerView = this._resourceListing.companyId == this._user.company.id;
        this.chatTitle =  this._resourceListing.idString + " - " + this._resourceListing.resource.name;
        this.setPriceLabel();
      });
  }

  getListingImages(id: number) {
    this.imageService.getImagesByListing(parseInt(this._listingId, 10)).
      subscribe(res => {
        this._imageData = res;
        this.createGalaryImages();
      });
  }

  createGalaryImages() {
    this.galleryImages = new Array();

    if (this._imageData.length > 0) {
      this._imageData.map(item => this.imageService.getFullImageUrl(item.name)).forEach(itemUrl => {
        const image = {
          small: itemUrl,
          medium: itemUrl,
          big: itemUrl,
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

  navigateBack() {
    this._location.back();
  }

  navigateToUpdateResource(id: any) {
    this.router.navigate(['dash/addresource',id]);
  }
}
