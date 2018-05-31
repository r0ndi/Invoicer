import {Injectable, OnInit} from '@angular/core';
import {DocumentType} from '../models/document-type';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpErrorHandler} from '../exceptions/httpErrorHandler';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DocumentTypeService {

  readonly defaultZeroTaxId = 4;
  readonly apiUrl: string = `${environment.webserviceUrl}/documentType`;
  private documentTypes = new BehaviorSubject<DocumentType[]>([]);

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.setDocumentTypes();
  }

  public getDocumentTypes(): Observable<DocumentType[]> {
    return this.documentTypes.asObservable();
  }

  public setDocumentTypes(): void {
    this.http.get<DocumentType[]>(this.apiUrl)
      .pipe(catchError(this.httpErrorHandler.handleError([])))
      .subscribe(documentTypes => this.documentTypes.next(documentTypes));
  }

}
