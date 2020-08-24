import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceOutOfferGridComponent } from './resource-out-offer-grid.component';

describe('ResourceOutOfferGridComponent', () => {
  let component: ResourceOutOfferGridComponent;
  let fixture: ComponentFixture<ResourceOutOfferGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceOutOfferGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceOutOfferGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
