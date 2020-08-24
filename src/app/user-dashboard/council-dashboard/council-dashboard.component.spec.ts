import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilDashboardComponent } from './council-dashboard.component';

describe('CouncilDashboardComponent', () => {
  let component: CouncilDashboardComponent;
  let fixture: ComponentFixture<CouncilDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
