import {Injectable} from '@angular/core';
import swal, {SweetAlertType} from 'sweetalert2';

@Injectable()
export class SwalDialogService {

  public addError(title: string): void {
    this.addDialog('error', title);
  }

  public addSuccess(title: string): void {
    this.addDialog('success', title);
  }

  public addWarning(title: string): void {
    this.addDialog('warning', title);
  }

  public addInfo(title: string): void {
    this.addDialog('info', title);
  }

  public addQuestion(title: string): void {
    this.addDialog('question', title);
  }

  private addDialog(type: SweetAlertType, title: string): void {
    swal({
      position: 'top-end',
      type: type,
      title: title,
      showConfirmButton: false,
      timer: 1500,
      backdrop: false,
      width: '25rem',
      customClass: 'font-10'
    });
  }

}
