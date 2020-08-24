import { Component, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { DashboardService } from '../../_services/dashboard.service';
import { DashBoardData } from '../../_models/dashboardData';
import { MessageService } from '../../_services/message.service';
import { StorageService } from '../../_services/storage.service';
import { User } from '../../_models/user';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public dashboardData: DashBoardData = new DashBoardData();
  private user: User;

  public ShowChat: boolean = false;
  public listingIdForChat: number;
  public listingIdForChatString: string;
  public buyerIdForChat: number;
  constructor(iconsLibrary: NbIconLibraries,
    private dashboardService: DashboardService,
    private messageService: MessageService,
    private storagrService: StorageService) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('fab', { packClass: 'fab', iconClassPrefix: 'fa' });
  }

  ngOnInit() {
    this.user = this.storagrService.getItem('user');
    this.initiateDashBoradData();
    this.getDashBoardData();
  }

  initiateDashBoradData() {
    this.dashboardData.cO2SavingsCurrent = 0.000;
    this.dashboardData.cO2SavingsTotal = 0.000;
    this.dashboardData.landFillCurrent = 0;
    this.dashboardData.landFillTotal = 0;
    this.dashboardData.wasteEarningsCurrent = 0;
    this.dashboardData.wasteEarningsTotal = 0;
    this.dashboardData.wasteExchangedCurrent = 0;
    this.dashboardData.wasteExchangedTotal = 0;
  }

  getDashBoardData() {
    this.dashboardService.getDashboardData(this.user.company.id).subscribe(res => {
      if (res) {
        this.dashboardData = res;
      }
    },
      error => {
        this.messageService.showErrorToast('Error', 'Error Loading Dashboard Data');
      });
  }

  public toggleChat(event)
  {
    this.ShowChat = false;
  }

  public openChat({ listingId,listingIdString,toId }) {
    this.ShowChat = false;
    this.listingIdForChat = listingId;
    this.listingIdForChatString = listingIdString;
    this.buyerIdForChat = toId;    
    setTimeout(() => this.ShowChat = true, 100);
  }

}
