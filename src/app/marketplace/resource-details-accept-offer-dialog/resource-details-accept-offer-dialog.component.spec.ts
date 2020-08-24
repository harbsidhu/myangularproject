import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceDetailsAcceptOfferDialogComponent } from './resource-details-accept-offer-dialog.component';

describe('ResourceDetailsAcceptOfferDialogComponent', () => {
  let component: ResourceDetailsAcceptOfferDialogComponent;
  let fixture: ComponentFixture<ResourceDetailsAcceptOfferDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceDetailsAcceptOfferDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDetailsAcceptOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
