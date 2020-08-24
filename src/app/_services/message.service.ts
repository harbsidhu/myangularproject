import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  constructor(private toastrService: NbToastrService) { }

  typePrimary: NbComponentStatus = 'primary';
  typeSuccess: NbComponentStatus = 'success';
  typeWarning: NbComponentStatus = 'warning';
  typeDanger: NbComponentStatus = 'danger';
  typeInfo: NbComponentStatus = 'info';

  public showPrimaryToast(title: string, body: string) {
    const config = {
      status: this.typePrimary,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };

    this.toastrService.show(
      body,
      'Info',
      config);
  }

  public showSuccessToast(title: string, body: string) {
    const config = {
      status: this.typeSuccess,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };

    this.toastrService.show(
      body,
      'Success',
      config);
  }



  public showWarningToast(title: string, body: string) {
    const config = {
      status: this.typeWarning,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };

    this.toastrService.show(
      body,
      'Warning',
      config);
  }

  public showErrorToast(title: string, body: string) {
    const config = {
      status: this.typeDanger,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };

    this.toastrService.show(
      body,
      'Error',
      config);
  }

  public showInfoToast(title: string, body: string) {
    const config = {
      status: this.typeInfo,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };

    this.toastrService.show(
      body,
      'Info',
      config);
  }
}
