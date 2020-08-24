import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDetailsPlaceOfferDialogComponent } from './resource-details-place-offer-dialog.component';

describe('ResourceDetailsPlaceOfferDialogComponent', () => {
  let component: ResourceDetailsPlaceOfferDialogComponent;
  let fixture: ComponentFixture<ResourceDetailsPlaceOfferDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceDetailsPlaceOfferDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDetailsPlaceOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
