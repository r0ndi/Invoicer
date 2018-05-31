import {Injectable} from '@angular/core';
import {Currency} from '../models/currency';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {HttpErrorHandler} from '../exceptions/httpErrorHandler';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class CurrencyService {

  readonly apiUrl: string = `${environment.webserviceUrl}/currency`;
  private currencies = new BehaviorSubject<Currency[]>([]);

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.setCurrencies();
  }

  public getCurrencies(): Observable<Currency[]> {
    return this.currencies.asObservable();
  }

  public setCurrencies(): void {
    this.http.get<Currency[]>(this.apiUrl)
      .pipe(catchError(this.httpErrorHandler.handleError([])))
      .subscribe(currencies => this.currencies.next(currencies));
  }

}
