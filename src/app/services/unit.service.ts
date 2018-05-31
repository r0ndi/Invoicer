import {Injectable} from '@angular/core';
import {Unit} from '../models/unit';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {HttpErrorHandler} from '../exceptions/httpErrorHandler';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UnitService {

  readonly apiUrl: string = `${environment.webserviceUrl}/unit`;
  private units = new BehaviorSubject<Unit[]>([]);

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.setUnits();
  }

  public getUnits(): Observable<Unit[]> {
    return this.units;
  }

  public setUnits(): void {
    this.http.get<Unit[]>(this.apiUrl)
      .pipe(catchError(this.httpErrorHandler.handleError([])))
      .subscribe(units => this.units.next(units));
  }

}
