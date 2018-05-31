import {Injectable} from '@angular/core';
import {SwalAlertService} from './swal.alert.service';
import {SwalDialogService} from './swal.dialog.service';

@Injectable()
export class SwalService {

  constructor(public swalAlert: SwalAlertService,
              public swalDialog: SwalDialogService) {
  }

}
