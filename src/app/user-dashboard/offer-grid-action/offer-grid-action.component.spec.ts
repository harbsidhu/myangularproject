import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferGridActionComponent } from './offer-grid-action.component';

describe('OfferGridActionComponent', () => {
  let component: OfferGridActionComponent;
  let fixture: ComponentFixture<OfferGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferGridActionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
