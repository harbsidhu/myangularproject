import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripepaymentComponent } from './stripepayment.component';

describe('StripepaymentComponentComponent', () => {
  let component: StripepaymentComponent;
  let fixture: ComponentFixture<StripepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripepaymentComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
