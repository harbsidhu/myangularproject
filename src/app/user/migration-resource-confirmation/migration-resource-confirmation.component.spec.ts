import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MigrationResourceConfirmationComponent } from './migration-resource-confirmation.component';

describe('MigrationResourceConfirmationComponent', () => {
  let component: MigrationResourceConfirmationComponent;
  let fixture: ComponentFixture<MigrationResourceConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigrationResourceConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationResourceConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
