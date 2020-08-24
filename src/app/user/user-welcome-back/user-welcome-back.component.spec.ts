import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserWelcomeBackComponent } from './user-welcome-back.component';

describe('UserWelcomeBackComponent', () => {
  let component: UserWelcomeBackComponent;
  let fixture: ComponentFixture<UserWelcomeBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWelcomeBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWelcomeBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
