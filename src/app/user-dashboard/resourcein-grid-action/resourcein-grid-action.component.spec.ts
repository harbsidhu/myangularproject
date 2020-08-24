import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceinGridActionComponent } from './resourcein-grid-action.component';

describe('ResourceinGridActionComponent', () => {
  let component: ResourceinGridActionComponent;
  let fixture: ComponentFixture<ResourceinGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceinGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceinGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
