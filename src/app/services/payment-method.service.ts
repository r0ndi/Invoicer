import {Injectable} from '@angular/core';
import {PaymentMethod} from '../models/payment-method';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {HttpErrorHandler} from '../exceptions/httpErrorHandler';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PaymentMethodService {

  readonly apiUrl: string = `${environment.webserviceUrl}/paymentMethod`;
  private paymentMethods = new BehaviorSubject<PaymentMethod[]>([]);

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.setPaymentMethods();
  }

  public getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.paymentMethods.asObservable();
  }

  public setPaymentMethods(): void {
    this.http.get<PaymentMethod[]>(this.apiUrl)
      .pipe(catchError(this.httpErrorHandler.handleError([])))
      .subscribe(paymentMethods => this.paymentMethods.next(paymentMethods));
  }

}
