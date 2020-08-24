import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from '../../_services/image.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() public id: number;
  @Input() public name: string;
  @Input() public price: string;
  @Input() public type: string;
  @Input() public offers: number;
  @Input() public views: number;
  @Input() public imagePath: string = '';
  @Input() public isMigrated: boolean = false;

  public isImageLoading: boolean;
  public imageToShow: any;

  constructor(private router: Router,
    private imageService: ImageService) { }

  ngOnInit() {
    if (this.imagePath.trim() === '') {
      this.imageToShow = '../../../../assets/images/item_bg.png';
    } else {
        this.imageToShow = this.imageService.getDownsizedImageUrl(this.imagePath);
    }
  }

  goToResource() {
    this.router.navigate(['/marketplace/resource/' + this.id]);
  }

  getImageFromService(path: string) {
    this.isImageLoading = true;
    this.imageService.getImageByPath(path)
      .subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
