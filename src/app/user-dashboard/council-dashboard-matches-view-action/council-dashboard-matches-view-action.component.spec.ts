import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CouncilDashboardMatchesViewActionComponent } from './council-dashboard-matches-view-action.component';

describe('CouncilDashboardMatchesViewActionComponent', () => {
  let component: CouncilDashboardMatchesViewActionComponent;
  let fixture: ComponentFixture<CouncilDashboardMatchesViewActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilDashboardMatchesViewActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilDashboardMatchesViewActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
