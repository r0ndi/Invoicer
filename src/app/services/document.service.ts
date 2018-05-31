import {Injectable} from '@angular/core';
import {HttpErrorHandler} from '../exceptions/httpErrorHandler';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {SwalService} from './swal/swal.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Document} from '../models/document';

@Injectable()
export class DocumentService {

  readonly apiUrl: string = `${environment.webserviceUrl}/document`;
  private documents = new BehaviorSubject<Array<Document>>([]);

  constructor(private http: HttpClient,
              private httpErrorHandler: HttpErrorHandler,
              private swalService: SwalService,
              private router: Router) {
    this.setDocuments();
  }

  public getDocuments(): Observable<Array<Document>> {
    return this.documents.asObservable();
  }

  public getDocument(id: number): Observable<Document> {
    return this.http.get<Document | any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.httpErrorHandler.handleError([])));
  }

  public setDocuments(): void {
    this.http.get<Array<Document>>(this.apiUrl)
      .pipe(catchError(this.httpErrorHandler.handleError([])))
      .subscribe((documents: Array<Document>) => this.documents.next(documents));
  }

  public addDocument(document: Document | any) {
    this.http.post<Document>(this.apiUrl, document)
      .pipe(catchError(this.httpErrorHandler.handleError([])))
      .subscribe(newDocument => {
        this.swalService.swalDialog.addSuccess('Utworzono nowy dokument!');
        this.router.navigate(['/document/list']);
      });
  }

  public editDocument(document: Document | any) {
    this.http.put<Document>(this.apiUrl, document)
      .pipe(catchError(this.httpErrorHandler.handleError([])))
      .subscribe((newDocument: Document) => {
        this.swalService.swalDialog.addSuccess('Edytowano dokument!');
        this.router.navigate(['/document/edit', newDocument.id]);
      });
  }

  public generatePdf(documentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/generatePdf/${documentId}`)
      .pipe(catchError(this.httpErrorHandler.handleError([])));
  }

  public cancelDocument(id: number): void {
    this.http.post<Document>(`${this.apiUrl}/cancel`, id)
      .pipe(catchError(this.httpErrorHandler.handleError([])))
      .subscribe(editedDocument => {
        this.swalService.swalDialog.addSuccess(`Anulowano dokument`);
      });
  }

  public getExpectedNumber(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/expectedNumber`)
      .pipe(catchError(this.httpErrorHandler.handleError([])));
  }
}
