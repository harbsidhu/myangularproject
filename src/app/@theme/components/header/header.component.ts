import { Component, OnDestroy, OnInit, TemplateRef, Input } from '@angular/core';
import {
  NbMediaBreakpointsService, NbSidebarService, NbThemeService,
  NbDialogService, NbMenuService,
} from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { StorageService } from '../../../_services/storage.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ResourceService } from '../../../_services/resource.service';
import { SelectItem } from '../../../_models/selectItem';
import { AuthService } from '../../../_services/auth.service';
import { User } from '../../../_models/user';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected searchString: string;
  protected dataService: CompleterData;
  public hideSidebar = false;

  public resources: Array<SelectItem> = new Array;
  anonymousForm: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;

  currentTheme = 'default';

  userMenu: any;
  @Input()
  set Menus( val: any) {
    this.userMenu = val;
  }

  constructor(private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private dialogService: NbDialogService,
    private nbMenuService: NbMenuService,
    private storageService: StorageService,
    private resourceService: ResourceService,
    private completerService: CompleterService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.hideSidebar = !(this.router.url === '/home/aspire'
                          );

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.anonymousForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.setUserAndMenu();

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title === 'Logout') {
          this.authService.clearToken();
          this.storageService.clearStorage();
          this.storageService.clear('menu');
          this.storageService.clear('user');
          this.userMenu = [{ title: 'Login', link: 'home' },
          { title: 'Create Account', link: 'user/registration' }];
          this.setUserAndMenu();
          this.router.navigate(['home']);
        }
      });
    this.getReousrcesForSearch();
    this.dataService = this.completerService.local(this.resources, 'name', 'name');
  }

  public navigateToHome() {
      this.router.navigate(['dash/dashboard']);
  }
  public setUserAndMenu() {
    // User data
    this.user = this.storageService.getItem('user');

    if (this.user === null) {
      this.user = new User();
      this.user.firstname = '';
      this.user.lastname = '';
      this.user.picture = 'assets/images/user_image.png';
    } else {
      this.user.picture = 'assets/images/user_image.png';
    }

    // set Menues
    if (localStorage.getItem('menu') === null) {
      this.userMenu = [{ title: 'Login', link: 'home' },
      { title: 'Create Account', link: 'user/registration' }];
      this.storageService.store('menu', this.userMenu);
    } else {
      this.userMenu = JSON.parse(localStorage.getItem('menu'));
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }


  public search1 = '';
  selectedStatic(result) {
    this.search1 = result.name;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateHome() {
    this.router.navigate(['home']);
    return false;
  }

  openMarketplace(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  toMarketplace(event) {
        event.preventDefault();
        this.router.navigate(['marketplace']);
  }

  getReousrcesForSearch() {
    this.resourceService.getResourcesForSearch()
      .subscribe(res => {
        this.resources = res;
      });
  }
}
