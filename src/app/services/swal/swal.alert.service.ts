import {Injectable} from '@angular/core';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import swal, {SweetAlertType} from 'sweetalert2';

@Injectable()
export class SwalAlertService {

    constructor(private swalAlert: SweetAlert2Module) {
    }

    public addError(title: string, text: string = '', footer: string = '', html: boolean = false): void {
        this.addAlert('error', title, text, footer, html);
    }

    public addSuccess(title: string, text: string = '', footer: string = '', html: boolean = false): void {
        this.addAlert('success', title, text, footer, html);
    }

    public addWarning(title: string, text: string = '', footer: string = '', html: boolean = false): void {
        this.addAlert('warning', title, text, footer, html);
    }

    public addInfo(title: string, text: string = '', footer: string = '', html: boolean = false): void {
        this.addAlert('info', title, text, footer, html);
    }

    public addQuestion(title: string, text: string = '', footer: string = '', html: boolean = false): void {
        this.addAlert('question', title, text, footer, html);
    }

    private addAlert(type: SweetAlertType, title: string, text: string = '', footer: string = '', html: boolean = false): void {
      if (html) {
        swal({'type': type, 'title': title, 'html': text, 'footer': footer});
      } else {
        swal({'type': type, 'title': title, 'text': text, 'footer': footer});
      }
    }
}
