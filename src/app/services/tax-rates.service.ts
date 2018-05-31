import {Injectable} from '@angular/core';
import {TaxRate} from '../models/tax-rate';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {HttpErrorHandler} from '../exceptions/httpErrorHandler';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TaxRatesService {

  readonly apiUrl: string = `${environment.webserviceUrl}/taxRate`;
  private taxRates = new BehaviorSubject<TaxRate[]>([]);

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.setTaxRates();
  }

  public getTaxRates(): Observable<TaxRate[]> {
    return this.taxRates.asObservable();
  }

  public setTaxRates(): void {
    this.http.get<TaxRate[]>(this.apiUrl)
      .pipe(catchError(this.httpErrorHandler.handleError([])))
      .subscribe(taxRates => this.taxRates.next(taxRates));
  }

  public setDefaultZeroTaxRate(): void {
    const taxRates = this.taxRates.getValue().filter(taxRate => taxRate.id === 1);
    this.taxRates.next(taxRates);
  }

}
