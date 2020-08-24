import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceinGridComponent } from './resourcein-grid.component';

describe('ResourceinGridComponent', () => {
  let component: ResourceinGridComponent;
  let fixture: ComponentFixture<ResourceinGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceinGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceinGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
