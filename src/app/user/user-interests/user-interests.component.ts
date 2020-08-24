import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService } from '../../_services/resource.service';
import { SelectItem } from '../../_models/selectItem';
import { StorageService } from '../../_services/storage.service';
import { User } from '../../_models/user';
import { ResourceCompany } from '../../_models/resourceCompany';
import { MessageService } from '../../_services/message.service';

interface CommodityResourceInterest {
    checked: boolean;
    selectedResources: Array<SelectItem>;
}

@Component({
  selector: 'ngx-user-interests',
  templateUrl: './user-interests.component.html',
  styleUrls: ['./user-interests.component.scss'],
})
export class UserInterestsComponent implements OnInit {

  _user: User;
  _resources: any;
  _selectedResources: any;
  // Comodities Checked
  public _chkOrganics: boolean = false;
  public _chkPaper: boolean = false;
  public _chkPlastics: boolean = false;
  public _chkGlass: boolean = false;
  public _chkTextiles: boolean = false;
  public _chkHazardous: boolean = false;
  public _chkChemicals: boolean = false;
  public _chkLiquids: boolean = false;
  public _chkEwaste: boolean = false;
  public _chkCnd: boolean = false;
  public _chkFurniture: boolean = false;
  public _chkAutomotive: boolean = false;
  public _chkWood: boolean = false;
  public _chkMetals: boolean = false;
  public _chkOther: boolean = false;
  private _noneChecked: boolean = false;

  //Resources

  _lstOrganics: any;
  _lstPaper: any;
  _lstMetals: any;
  _lstPlastics: any;
  _lstGlass: any;
  _lstTextiles: any;
  _lstHazardous: any;
  _lstChemicals: any;
  _lstLiquids: any;
  _lstEwaste: any;
  _lstCnd: any;
  _lstFurniture: any;
  _lstAutomotive: any;
  _lstWood: any;
  _lstOther: any;

  //Drop Down Selected Items

  _selectedOrganics: Array<SelectItem> = new Array<SelectItem>();
  _selectedPaper: Array<SelectItem> = new Array<SelectItem>();
  _selectedMetals: Array<SelectItem> = new Array<SelectItem>();
  _selectedPlastics: Array<SelectItem> = new Array<SelectItem>();
  _selectedGlass: Array<SelectItem> = new Array<SelectItem>();
  _selectedTextiles: Array<SelectItem> = new Array<SelectItem>();
  _selectedHazardous: Array<SelectItem> = new Array<SelectItem>();
  _selectedChemicals: Array<SelectItem> = new Array<SelectItem>();
  _selectedLiquids: Array<SelectItem> = new Array<SelectItem>();
  _selectedEwaste: Array<SelectItem> = new Array<SelectItem>();
  _selectedCnd: Array<SelectItem> = new Array<SelectItem>();
  _selectedFurniture: Array<SelectItem> = new Array<SelectItem>();
  _selectedAutomotive: Array<SelectItem> = new Array<SelectItem>();
  _selectedWood: Array<SelectItem> = new Array<SelectItem>();
  _selectedOther: Array<SelectItem> = new Array<SelectItem>();

  private organicsCommodityId = 1;
  private paperCommodityId = 2;
  private metalsCommodityId = 3;
  private plasticsCommodityId = 4;
  private glassCommodityId = 5;
  private textilesCommodityId = 6;
  private hazardousCommodityId = 8;
  private chemicalsCommodityId = 14;
  private liquidsCommodityId = 13;
  private ewasteCommodityId = 9;
  private cndCommodityId = 7;
  private furnitureCommodityId = 12;
  private automotiveCommodityId = 11;
  private woodCommodityId = 15;
  private otherCommodityId = 10;

  public isNext: boolean = false;
  private _commoditiesWithNoResourcesChecked: boolean = false;
  private _requestJson: Array<ResourceCompany> = new Array<ResourceCompany>();

  //Drop Down settings
  dropdownSettings: any;


  constructor(private router: Router,
    private resourcesService: ResourceService,
    private storageService: StorageService,
    private messageService: MessageService) { }

  ngOnInit() {
    this._user = this.storageService.getItem('user');
    this.resourcesService.getResources().subscribe(res => {
        this._resources = res;
        this.getResourcesList();
    });
    this.loadInterests();
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select resources',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      labelKey: 'name',
      classes: 'myclass custom-dropdown',
    };

  }

  next() {
    this.updateCheckedCommodities();
    this.isNext = !this._noneChecked;
  }

  OrganicsClicked(event: any) {
      this._chkOrganics = event.currentTarget.checked;
      this.updateCheckedCommodities();
  }

  PaperClicked(event: any) {
    this._chkPaper = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }

  MetalsClicked(event: any) {
    this._chkMetals = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }

  PlasticsClicked(event: any) {
    this._chkPlastics = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }

  GlassClicked(event: any) {
    this._chkGlass = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }

  TextilesClicked(event: any) {
    this._chkTextiles = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }

  HazardousClicked(event: any) {
    this._chkHazardous = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }

  ChemicalsClicked(event: any) {
    this._chkChemicals = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }

  LiquidsClicked(event: any) {
    this._chkLiquids = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }

  EwasteClicked(event: any) {
    this._chkEwaste = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }

  CndClicked(event: any) {
    this._chkCnd = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }

  FurnitureClicked(event: any) {
    this._chkFurniture = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }

  AutomotiveClicked(event: any) {
    this._chkAutomotive = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }

  WoodClicked(event: any) {
    this._chkWood = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }
  OtherClicked(event: any) {
    this._chkOther = event.currentTarget.checked;
    this.updateCheckedCommodities();
  }

  updateCheckedCommodities() {
    const chkAllCommodities = [
        this._chkOrganics, this._chkPaper, this._chkMetals, this._chkPlastics, this._chkGlass, this._chkTextiles,
        this._chkHazardous, this._chkChemicals, this._chkLiquids, this._chkEwaste, this._chkCnd, this._chkFurniture,
        this._chkAutomotive, this._chkWood, this._chkOther,
    ];
    this._noneChecked = chkAllCommodities.find(x => x === true) === undefined;
  }

  back() {
    this.isNext = false;
  }

  navigateToDashboard() {
    const resourcesToVerify = new Array<CommodityResourceInterest>();
    resourcesToVerify.push(
        { checked: this._chkOrganics, selectedResources: this._selectedOrganics },
        { checked: this._chkPaper, selectedResources: this._selectedPaper },
        { checked: this._chkPlastics, selectedResources: this._selectedPlastics },
        { checked: this._chkGlass, selectedResources: this._selectedGlass },
        { checked: this._chkTextiles, selectedResources: this._selectedTextiles },
        { checked: this._chkHazardous, selectedResources: this._selectedHazardous },
        { checked: this._chkChemicals, selectedResources: this._selectedChemicals },
        { checked: this._chkLiquids, selectedResources: this._selectedLiquids },
        { checked: this._chkEwaste, selectedResources: this._selectedEwaste },
        { checked: this._chkCnd, selectedResources: this._selectedCnd },
        { checked: this._chkFurniture, selectedResources: this._selectedFurniture },
        { checked: this._chkAutomotive, selectedResources: this._selectedAutomotive },
        { checked: this._chkMetals, selectedResources: this._selectedMetals },
        { checked: this._chkWood, selectedResources: this._selectedWood },
        { checked: this._chkOther, selectedResources: this._selectedOther },
    );

    this._commoditiesWithNoResourcesChecked =
        resourcesToVerify.map(r => r.checked && r.selectedResources.length < 1).reduce((x, y) => x || y);
    if (!this._commoditiesWithNoResourcesChecked)
        this.postResourcesCompany();
  }

  loadInterests() {

    this.resourcesService.getResourcesByCompany(this._user.company.id)
      .subscribe(res => {
        this._selectedResources = res;
        const comms = [...new Set( this._selectedResources.map(x => x.id))];

        comms.forEach((commId) => {
          this.setCommodities(commId);
        });

      });
  }

  setCommodities(id: any) {

    switch (id) {
      case 1: 	this._chkOrganics  = true;	this._selectedOrganics =  this._selectedResources.find(x => x.id === id).children;	break;
      case 2: 	this._chkPaper = true;	this._selectedPaper =  this._selectedResources.find(x => x.id === id).children;	break;
      case 3: 	this._chkMetals = true;	this._selectedMetals =  this._selectedResources.find(x => x.id === id).children; break;
      case 4: 	this._chkPlastics = true;	this._selectedPlastics =  this._selectedResources.find(x => x.id === id).children;	break;
      case 5: 	this._chkGlass = true;	this._selectedGlass =  this._selectedResources.find(x => x.id === id).children;	break;
      case 6: 	this._chkTextiles = true;	this._selectedTextiles =  this._selectedResources.find(x => x.id === id).children;	break;
      case 8: 	this._chkHazardous = true;	this._selectedHazardous =  this._selectedResources.find(x => x.id === id).children;	break;
      case 14: 	this._chkChemicals = true;	this._selectedChemicals =  this._selectedResources.find(x => x.id === id).children;	break;
      case 13: 	this._chkLiquids = true;	this._selectedLiquids =  this._selectedResources.find(x => x.id === id).children; break;
      case 9:	this._chkEwaste = true;	this._selectedEwaste =  this._selectedResources.find(x => x.id === id).children; break;
      case 7:	this._chkCnd = true; this._selectedCnd =  this._selectedResources.find(x => x.id === id).children; break;
      case 12:	this._chkFurniture = true;	this._selectedFurniture 	=  this._selectedResources.find(x => x.id === id).children;	 break;
      case 11:	this._chkAutomotive	= true;	this._selectedAutomotive	=  this._selectedResources.find(x => x.id === id).children;	 break;
      case 15: this._chkWood = true; this._selectedWood = this._selectedResources.find(x => x.id === id).children; break;
      case 10:	this._chkOther = true; this.	_selectedOther     	=  this._selectedResources.find(x => x.id === id).children;	 break;
      default: break;
    }
  }

  getResourcesList() {
    this._lstOrganics = this._resources
        .filter(item => item.commodityId === this.organicsCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name, commodityId: this.organicsCommodityId }));
    this._lstPaper = this._lstPaper = this._resources
        .filter(item => item.commodityId === this.paperCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name }));
    this._lstMetals = this._resources
        .filter(item => item.commodityId === this.metalsCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name }));
    this._lstPlastics = this._resources
        .filter(item => item.commodityId === this.plasticsCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name }));
    this._lstGlass = this._resources
        .filter(item => item.commodityId === this.glassCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name }));
    this._lstTextiles = this._resources
        .filter(item => item.commodityId === this.textilesCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name }));
    this._lstHazardous = this._resources
        .filter(item => item.commodityId === this.hazardousCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name }));
    this._lstChemicals = this._resources
        .filter(item => item.commodityId === this.chemicalsCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name }));
    this._lstLiquids = this._resources
        .filter(item => item.commodityId === this.liquidsCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name }));
    this._lstEwaste = this._resources
        .filter(item => item.commodityId === this.ewasteCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name }));
    this._lstCnd = this._resources
        .filter(item => item.commodityId === this.cndCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name }));
    this._lstFurniture = this._resources
        .filter(item => item.commodityId === this.furnitureCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name }));
    this._lstAutomotive = this._resources
        .filter(item => item.commodityId === this.automotiveCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name }));
    this._lstWood = this._resources
        .filter(item => item.commodityId === this.woodCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name}));
    this._lstOther = this._resources
        .filter(item => item.commodityId === this.otherCommodityId)
        .map(item => ({ id: item.resource.id, name: item.resource.name }));
  }

  postResourcesCompany() {
    this.createResourceJSON();
    this.resourcesService.postResourcesByCompany(this._user.company.id.toString(), this._requestJson).subscribe(res => {
      if (res) {
        this.messageService.showSuccessToast('Success', 'Commodity interests are saved successfully.');
        if (!this._user.company.isMigrationComplete) {
          this.router.navigate(['user/profile']);
        } else {
          this.router.navigate(['dash/dashboard']);
        }
      }
    },
      error => {
        console.error('Error: ' + error);
        this.messageService.showErrorToast('Error'
        , 'Error occoured while Adding Resource. Please contact ASPIRE support for further assistance.');
      });
  }

  createResourceJSON() {
    const companyId = this._user.company.id;
    this._requestJson = new Array<ResourceCompany>();
    if (this._chkOrganics) {
      this._selectedOrganics.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.organicsCommodityId });
      });
    }
    if (this._chkPaper) {
      this._selectedPaper.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.paperCommodityId });
      });
    }
    if (this._chkMetals) {
      this._selectedMetals.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.metalsCommodityId });
      });
    }
    if (this._chkPlastics) {
      this._selectedPlastics.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.plasticsCommodityId });
      });
    }
    if (this._chkGlass) {
      this._selectedGlass.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.glassCommodityId });
      });
    }
    if (this._chkTextiles) {
      this._selectedTextiles.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.textilesCommodityId });
      });
    }
    if (this._chkHazardous) {
      this._selectedHazardous.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.hazardousCommodityId });
      });
    }
    if (this._chkChemicals) {
      this._selectedChemicals.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.chemicalsCommodityId });
      });
    }
    if (this._chkLiquids) {
      this._selectedLiquids.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.liquidsCommodityId });
      });
    }
    if (this._chkEwaste) {
      this._selectedEwaste.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.ewasteCommodityId });
      });
    }
    if (this._chkCnd) {
      this._selectedCnd.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.cndCommodityId });
      });
    }
    if (this._chkFurniture) {
      this._selectedFurniture.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.furnitureCommodityId });
      });
    }
    if (this._chkAutomotive) {
      this._selectedAutomotive.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.automotiveCommodityId });
      });
    }
    if (this._chkWood) {
        this._selectedWood.forEach(item => {
            this._requestJson.push({ resourceId: item.id,  companyId: companyId, commodityId: this.woodCommodityId });
        })
    }
    if (this._chkOther) {
      this._selectedOther.forEach(item => {
        this._requestJson.push({ resourceId: item.id, companyId: companyId, commodityId: this.otherCommodityId });
      });
    }
  }
}
