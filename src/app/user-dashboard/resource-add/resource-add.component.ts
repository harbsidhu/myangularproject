import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CameraDialogComponent } from '../../pages/modal-overlays/dialog/camera-dialog/camera-dialog.component';
import { Company } from '../../_models/company';
import { ResourceCommodity } from '../../_models/resourceCommodity';
import { ResourceListing } from '../../_models/resourceListing';
import { ResourceListType } from '../../_models/resourceListType';
import { SelectItem } from '../../_models/selectItem';
import { Unit } from '../../_models/unit';
import { User } from '../../_models/user';
import { TOKEN_NAME } from '../../_services/auth.service';
import { ImageService } from '../../_services/image.service';
import { MasterdataService } from '../../_services/masterdata.service';
import { MessageService } from '../../_services/message.service';
import { ResourceService } from '../../_services/resource.service';
import { ResourceListingService } from '../../_services/resourceListing.service';
import { StorageService } from '../../_services/storage.service';
import { UploadStatus } from '../../_shared/enum/upload-status.enum';
import { FileUploadAdapter } from '../../_shared/fileUploadAdapter';

@Component({
    selector: 'ngx-resource-add',
    templateUrl: './resource-add.component.html',
    styleUrls: ['./resource-add.component.scss'],
})
export class ResourceAddComponent implements OnInit {
    public isFirst: boolean = true;
    public isSecond: boolean = false;
    public isFinal: boolean = false;

    public termAgreed: boolean = false;
    public isTermError: boolean = false;

    public fileMaxError: boolean = false;
    public fileMinError: boolean = false;

    public listingDurationInvalid: boolean = false;
    public _listingId: string | undefined = this.route.snapshot.paramMap.get('id');
    public _existingResourceListing: ResourceListing;

    public isEditView: boolean = false;
    isProcessing;
    _showPayingControls: boolean = false;
    _showSellingControls: boolean = false;
    _showFreeControls: boolean = false;
    _resourceListing: ResourceListing;
    _selectedAttributesArray: SelectItem[] = new Array;
    _selectedAttributes: string = '';
    _selectedResource: Array<ResourceCommodity>;
    _selectedUnit: string;
    _selectedDisposalType: SelectItem;
    _user: User;
    _minStartDateForListing: Date = this.getDate();
    _maxStartDateForListing: Date = new Date(this.getDate().setFullYear(2100));
    _listingDuration: any;
    _attributes: Array<SelectItem> = new Array;
    _units: Array<SelectItem> = new Array;
    _frequencies: Array<SelectItem> = new Array;
    _addresses: Array<SelectItem> = new Array;
    _resourceListTypes: Array<ResourceListType> = new Array;

    _freeList: boolean = false;
    _sellList: boolean = false;
    _disposalList: boolean = false;

    _fileAdapter: any;
    dropdownSettings: any;
    resourceForm: FormGroup;
    deleteImageHttpRequest = [];
    protected resources: Array<ResourceCommodity> = new Array;

    constructor(
        private resourceListingService: ResourceListingService,
        private fb: FormBuilder,
        private http: HttpClient,
        private resourceService: ResourceService,
        private masterdateService: MasterdataService,
        private storageService: StorageService,
        private listingService: ResourceListingService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private router: Router,
        private imageService: ImageService,
        private sanitizer: DomSanitizer,
        private dialogService: NbDialogService) {
        this._fileAdapter = new FileUploadAdapter(this.http);
    }

    ngOnInit() {
        this.resourceForm = this.fb.group({
            resource: [''],
            resourceListType: ['', Validators.required],
            attribute: [''],
            quantity: ['', [Validators.required]],
            unit: ['', Validators.required],
            frequency: ['', Validators.required],
            location: ['', Validators.required],
            description: ['', Validators.required],
            sellListPrice: [''],
            sellNegotiable: [false],
            freeListPrice: ['Free'],
            freeValue: [''],
            disposalListPrice: [''],
            disposalValue: [''],
            listingDuration: ['']
        });
        this._user = this.storageService.getItem('user');

        this._addresses = this._user.company.addresses.map(x => ({ id: x.id, name: x.fullAddress }));

        this._listingId = this.route.snapshot.paramMap.get('id');

        if (this._listingId) {
            this.setFinalTab();
            this.isEditView = true;
        }

        this.getConfiguration();

        this.dropdownSettings = {
            singleSelection: true,
            text: 'Select resource',
            enableSearchFilter: true,
            labelKey: 'name',
            classes: 'myclass custom-dropdown',
        };
    }

    openCamera = () => {
        this.dialogService.open(CameraDialogComponent, {
            context: {
                title: 'Take a photo',
            },
        }).onClose.subscribe(file => {
            if (file) {
                this.files.push(file);
            }
        });
    }

    getConfiguration = () => {
        forkJoin(this.getResourcesForSearch(), this.getDisposalTypes())
            .subscribe(([resources, resourceListTypes]) => {
                this.resources = resources;
                this.resources.forEach(x => x.name = x.name + ' (' + x.commodityName + ')');
                this._resourceListTypes = resourceListTypes;
                if (this._listingId) {
                    this.getResourceListingById(parseInt(this._listingId, 10));
                }
            });
    }

    getImagesList = () => {
        this.imageService.getImagesByListing(parseInt(this._listingId)).subscribe(images => {
            this._existingResourceListing.resourceImages = images.map(image => {
                return {
                    id: image.id,
                    name: image.name,
                    url: this.sanitizer.bypassSecurityTrustStyle(`url(${this.imageService.getFullImageUrl(image.name)})`),
                    resourceListingId: image.resourceListingId
                };
            });
        });
    }

    accept = '*';
    files: File[] = [];
    progress: number;
    hasBaseDropZoneOver: boolean = false;
    httpEmitter: Subscription;
    httpEvent: HttpEvent<{}>;
    lastFileAt: Date;

    sendableFormData: FormData;

    dragFiles: any;
    validComboDrag: any;
    lastInvalids: any;
    fileDropDisabled: any;
    maxSize: any = 5242880;
    baseDropValid: any;
    maxNoOfFiles = 3;

    public status: UploadStatus;

    cancel() {
        this.progress = 0;
        if (this.httpEmitter) {
            this.httpEmitter.unsubscribe();
        }
    }


    getDate() {
        return new Date();
    }

    /////////////////////////////// Image upload


    get attributes() {
        return this.resourceForm.controls.attribute.value;
    }

    moveToFirst() {

        this.isFirst = true;
        this.isSecond = false;
        this.isFinal = false;
    }

    moveToSecond() {
        this.isFirst = false;
        this.isSecond = true;
        this.isFinal = false;
    }

    moveToFinal() {
        this.LoadMasterData().subscribe(response => {
            this._units = response[0];
            this._frequencies = response[1];
            this._attributes = response[2];
        });

        this.setFinalTab();
    }

    setFinalTab() {
        this.isFirst = false;
        this.isSecond = false;
        this.isFinal = true;
    }

    onFirstSubmit() {

    }
    onDisposalTypeChange(id: any) {
        this._selectedDisposalType = this._resourceListTypes.find(x => x.id === id);
        this.changeControlsBasedOnResourceType(this._selectedDisposalType.name);
    }

    onResourceSelect() {
        this.resourceForm.controls.attribute.reset();
        this.resourceForm.controls.unit.reset();
    }

    onAttributeSelected(event) {
        const id = event;
        this._selectedAttributes = '';
        this._selectedAttributesArray = new Array;
        id.forEach(item => {
            const attribute = this._attributes.find(x => x.id === item);

            this._selectedAttributesArray.push(attribute);
            this._selectedAttributes += (' ' + attribute.name + ',');
        });

        this._selectedAttributes = this._selectedAttributes.slice(0, -1).trim();
    }

    onResourceReset() {
        this._selectedResource = undefined;
    }

    toggle(checked: boolean) {
        this.termAgreed = checked;
    }

    getResourceListingById(id: number) {
        this.resourceListingService.getResourceListingById(id)
            .subscribe(res => {
                this._existingResourceListing = res.resourceListing;
                this._selectedResource = this.resources.filter(r => r.id === this._existingResourceListing.resource.id);

                this.LoadMasterData().subscribe(response => {
                    this._units = response[0];
                    this._frequencies = response[1];
                    this._attributes = response[2];
                    this.populatelisting();
                });

                this.getImagesList();

            });
    }

    changeControlsBasedOnResourceType(listingType: string) {
        switch (listingType) {
            case 'I am paying for the disposal.':
                this._showPayingControls = true;
                this._showSellingControls = false;
                this._showFreeControls = false;
                this.resourceForm.controls.sellListPrice.reset();
                this.resourceForm.controls.sellNegotiable.reset();
                this.resourceForm.controls.freeValue.reset();
                this.resourceForm.controls.disposalValue.setValidators([Validators.required]);
                this.resourceForm.controls.disposalListPrice.setValidators([Validators.required]);
                this.resourceForm.controls.sellListPrice.clearValidators();
                this.resourceForm.controls.sellNegotiable.clearValidators();
                this.resourceForm.controls.freeValue.clearValidators();
                break;
            case 'I am selling.':
                this._showPayingControls = false;
                this._showSellingControls = true;
                this._showFreeControls = false;
                this.resourceForm.controls.freeValue.reset();
                this.resourceForm.controls.disposalValue.reset();
                this.resourceForm.controls.disposalListPrice.reset();
                this.resourceForm.controls.disposalValue.clearValidators();
                this.resourceForm.controls.disposalListPrice.clearValidators();
                this.resourceForm.controls.sellListPrice.setValidators([Validators.required]);
                this.resourceForm.controls.sellNegotiable.setValidators([Validators.required]);
                this.resourceForm.controls.freeValue.clearValidators();
                break;
            case 'I am giving it away for free.':
                this._showPayingControls = false;
                this._showSellingControls = false;
                this._showFreeControls = true;
                this.resourceForm.controls.sellListPrice.reset();
                this.resourceForm.controls.sellNegotiable.reset();
                this.resourceForm.controls.disposalValue.reset();
                this.resourceForm.controls.disposalListPrice.reset();
                this.resourceForm.controls.disposalValue.clearValidators();
                this.resourceForm.controls.disposalListPrice.clearValidators();
                this.resourceForm.controls.sellListPrice.clearValidators();
                this.resourceForm.controls.sellNegotiable.clearValidators();
                this.resourceForm.controls.freeValue.setValidators([Validators.required]);
                break;
        }
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    LoadMasterData(): Observable<any> {

        let response1 = this.getUnits();
        let response2 = this.getFrequencies();
        let response3 = this.getAttributes();
        return forkJoin(response1, response2, response3);

    }

    getResourcesForSearch() {
        return this.resourceService.getResourcesForSearch();

    }

    getAttributes(): Observable<any> {
        return this.masterdateService.getAttributes(this._selectedResource[0].id.toString());
    }

    getUnits(): Observable<any> {
        return this.masterdateService.getUnits(this._selectedResource[0].id.toString());
    }

    getFrequencies(): Observable<any> {
        return this.masterdateService.getFrequencies();
    }

    getDisposalTypes() {
        return this.masterdateService.getResourceListTypes();
    }

    createResourcelisting(files: File[]) {
        if (this._listingDuration && this._listingDuration.start) {
            this.listingDurationInvalid = false;

        }
        else {
            this.listingDurationInvalid = true;
            this.validateAllFormFields(this.resourceForm);
        }

        const fileLength = files.length + (this._existingResourceListing ? this._existingResourceListing.resourceImages.length : 0);

        if (fileLength > 3) {
            this.fileMaxError = true;
            this.validateAllFormFields(this.resourceForm);
        } else if (fileLength < 1) {
            this.fileMinError = true;
        } else if (!this.termAgreed) {
            this.fileMaxError = false;
            this.fileMinError = false;
            this.isTermError = true;
            this.validateAllFormFields(this.resourceForm);
        } else {
            if (this.resourceForm.valid && fileLength > 0) {

                var resourceListingObject = this.populateResourcelistingObject();

                if (!this.isEditView) {
                    this.createlisting(resourceListingObject, files);
                }
                else {
                    resourceListingObject.id = this._existingResourceListing.id;
                    this.updatelisting(resourceListingObject, files);
                }
            } else {
                this.validateAllFormFields(this.resourceForm);
            }
        }
    }

    downloadFile(url: string): Observable<any> {
        return this.http.get(url, { responseType: 'blob' });
    }

    populatelisting() {

        const resourceListing = this._existingResourceListing;
        var attributeList = resourceListing.attributeString.split(',').map(item => item.trim());

        this.resourceForm.controls.resource.setValue(this.resources.find(r => r.id == resourceListing.resource.id).name);
        this.resourceForm.controls.quantity.setValue(resourceListing.quantity);
        this.resourceForm.controls.description.setValue(resourceListing.description);
        this.resourceForm.controls.location.setValue(resourceListing.address.id);


        this.resourceForm.controls.resourceListType.setValue(resourceListing.resourceListType.id);
        this.resourceForm.controls.sellListPrice.setValue(resourceListing.sellPrice);

        this.resourceForm.controls.disposalValue.setValue(resourceListing.disposalApproxPrice);
        this.resourceForm.controls.disposalListPrice.setValue(resourceListing.disposalPrice);
        this.resourceForm.controls.sellNegotiable.setValue(resourceListing.priceNegotiable);
        this.resourceForm.controls.freeListPrice.setValue(resourceListing.freeListingPrice);
        this.resourceForm.controls.freeValue.setValue(resourceListing.freeApproxPrice);

        setTimeout(() => {
            this.resourceForm.controls.attribute.setValue(this._attributes.filter(a => attributeList.includes(a.name)).map(a => a.id));
            this.resourceForm.controls.unit.setValue(resourceListing.unit.id);
            this.resourceForm.controls.frequency.setValue(resourceListing.frequency.id);
        }, 100);
        var startDate = new Date(resourceListing.startDate);
        this._listingDuration = {
            start: startDate,
            end: resourceListing.expiryDateTimeUTC ? resourceListing.expiryDateTimeUTC :
                new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate())
        };

        this.onDisposalTypeChange(resourceListing.resourceListType.id);
    }

    createlisting(_resourceListing: ResourceListing, files: File[]) {

        this.listingService.createResourceListing(this._resourceListing).subscribe(res => {
            if (res) {
                console.log('createResourceListing()' + JSON.stringify(res));
                this.uploadFiles(files, res.responseBody.id.toString());
                this.router.navigate(['dash/resources']);
            }
        },
            error => {
                this.messageService.showErrorToast('Errror', error);
                console.error('Error: ' + error);
            });
    }

    updatelisting(_resourceListing: ResourceListing, files: File[]) {

        // forkJoin(this.deleteImageHttpRequest).subscribe(() => {

        // });
        if (this.deleteImageHttpRequest.length) {
            this.imageService.deleteImages(this.deleteImageHttpRequest).subscribe();
        }
        this.listingService.updateResourceListing(this._resourceListing).subscribe(res => {
            if (res) {
                console.log('updateResourceListing()' + JSON.stringify(res));
                this.uploadFiles(files, res.responseBody.id.toString());
                this.router.navigate(['dash/resources']);
            }
        },
            error => {
                this.messageService.showErrorToast('Errror', error);
                console.error('Error: ' + error);
            });
    }

    private populateResourcelistingObject(): ResourceListing {
        this._resourceListing = new ResourceListing();
        this._resourceListing.resource = { id: this._selectedResource[0].id, name: this._selectedResource[0].name };
        this._resourceListing.commodity =
            { id: this._selectedResource[0].commodityId, name: this._selectedResource[0].commodityName };
        this._resourceListing.quantity = this.resourceForm.value.quantity;
        this._resourceListing.description = this.resourceForm.value.description;
        this._resourceListing.attribute = this._attributes.find(x => x.id === this.resourceForm.value.attribute);
        this._resourceListing.attributeString = this._selectedAttributes;
        this._resourceListing.unit = new Unit();
        this._resourceListing.unit.id = this._units.find(x => x.id === this.resourceForm.value.unit).id;
        this._resourceListing.unit.name = this._units.find(x => x.id === this.resourceForm.value.unit).name;
        this._resourceListing.frequency = this._frequencies.find(x => x.id === this.resourceForm.value.frequency);
        this._resourceListing.address = this._user.company.addresses.find(x => x.id === this.resourceForm.value.location);
        this._resourceListing.resourceListType = this._resourceListTypes
            .find(x => x.id === this.resourceForm.value.resourceListType);
        this._resourceListing.sellPrice = this.resourceForm.value.sellListPrice === null
            ? 0 : this.resourceForm.value.sellListPrice;
        this._resourceListing.priceNegotiable = this.resourceForm.value.sellNegotiable === null
            ? 0 : this.resourceForm.value.sellNegotiable;
        this._resourceListing.freeListingPrice = this.resourceForm.value.freeListPrice === null
            ? 0 : this.resourceForm.value.freeListPrice;
        this._resourceListing.freeApproxPrice = this.resourceForm.value.freeValue === null
            ? 0 : this.resourceForm.value.freeValue;
        this._resourceListing.disposalPrice = this.resourceForm.value.disposalListPrice === null
            ? 0 : this.resourceForm.value.disposalListPrice;
        this._resourceListing.disposalApproxPrice = this.resourceForm.value.disposalValue === null
            ? 0 : this.resourceForm.value.disposalValue;
        this._resourceListing.freeListingPrice = 0;
        this._resourceListing.company = new Company();
        this._resourceListing.company.id = this._user.company.id;
        this._resourceListing.company.abn = this._user.company.abn;
        this._resourceListing.user = new User();
        this._resourceListing.user.id = this._user.id;

        this._resourceListing.attributeString = this.resourceForm.controls.attribute.value.length > 0 ?
            this._attributes.filter(a => this.resourceForm.controls.attribute.value.includes(a.id)).map((e) => e.name).join(", ") :
            this._existingResourceListing.attributeString;

        this._resourceListing.startDate = this._listingDuration.start;
        this._resourceListing.expiryDateTimeUTC = this._listingDuration.end;
        return this._resourceListing;
    }

    uploadFiles(files: File[], listingId: any): boolean {

        let retn: boolean;
        const url = environment.base_url + '/api/image/images/' + listingId;
        let count = 1;

        let imageRequests = [];

        const token = localStorage.getItem(TOKEN_NAME);
        const AUTH_PREFIX = 'Bearer';

        files.forEach(file => {
            const filename = listingId + '_' + count + '.' + file.name.split('.')[1];
            count++;
            const myFormData: FormData = new FormData();
            myFormData.append('file', file, filename);

            const req = new HttpRequest<FormData>(
                'POST',
                url,
                myFormData, {
                reportProgress: true,
                headers: new HttpHeaders({ 'Authorization': `${AUTH_PREFIX} ${token.substring(1).slice(0, -1)}` }),
            });

            imageRequests.push(this.http.request(req));
        });

        forkJoin(imageRequests).subscribe(() => {
            retn = true;
        }, () => {
            retn = false;
        });
        return retn;
    }

    openTnC() {
        window.open('docs/tnc');
    }

    deleteExistImage(resouceImage) {
        const body = {
            id: resouceImage.id,
            name: resouceImage.name,
            resourceListingId: resouceImage.resourceListingId,
        };
        this.deleteImageHttpRequest.push(body);
        // tslint:disable-next-line: max-line-length
        this._existingResourceListing.resourceImages.splice(this._existingResourceListing.resourceImages.indexOf(resouceImage), 1);
    }
}
