import {Injectable} from '@angular/core';
import {Status} from '../models/status';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {HttpErrorHandler} from '../exceptions/httpErrorHandler';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class StatusService {

  readonly apiUrl: string = `${environment.webserviceUrl}/status`;
  private statuses = new BehaviorSubject<Status[]>([]);

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.setStatuses();
  }

  public getStatuses(): Observable<Status[]> {
    return this.statuses.asObservable();
  }

  public setStatuses(): void {
    this.http.get<Status[]>(this.apiUrl)
      .pipe(catchError(this.httpErrorHandler.handleError([])))
      .subscribe(statuses => this.statuses.next(statuses));
  }

}
