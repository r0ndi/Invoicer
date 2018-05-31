import {Injectable} from '@angular/core';
import {SwalService} from '../services/swal/swal.service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class HttpErrorHandler {

  constructor(private swalService: SwalService) {
  }

  public handleError<T>(result: T, operation?: string) {
    if (operation) {
      console.log('ErrorMsg:', operation);
    }

    return (error: any): Observable<T> => {
      console.log('HttpError', error);

      this.swalService.swalDialog.addError(error.message);
      return of(result as T);
    };
  }

}
