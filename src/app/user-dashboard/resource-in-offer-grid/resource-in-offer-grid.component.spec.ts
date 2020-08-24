import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceInOfferGridComponent } from './resource-in-offer-grid.component';

describe('ResourceInOfferGridComponent', () => {
  let component: ResourceInOfferGridComponent;
  let fixture: ComponentFixture<ResourceInOfferGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceInOfferGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceInOfferGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
