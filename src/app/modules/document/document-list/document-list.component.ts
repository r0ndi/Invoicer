import {Component, OnInit} from '@angular/core';
import {DocumentService} from '../../../services/document.service';
import {Subject} from 'rxjs/Subject';
import {SwalService} from '../../../services/swal/swal.service';
import {Document} from '../../../models/document';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent {
  dtOptions: DataTables.Settings = {pagingType: 'full_numbers', pageLength: 2};
  dtTrigger: Subject<any> = new Subject();
  documents: Array<Document> = [];

  constructor(private documentService: DocumentService, private swalService: SwalService) {
    this.documentService.getDocuments().subscribe((documents: Array<Document>) => {
      this.documents = documents;
      this.dtTrigger.next();
    });
  }

  public getDocumentPdf(documentId): void {
    this.documentService.generatePdf(documentId).subscribe(response => {
      this.swalService.swalAlert.addSuccess(
        'Pobrano dokument',
        `<a href="${response.url}" target="_blank">Pobierz plik PDF #${documentId}</a>`,
        '',
        true
      );
    });
  }

  public cancelDocument(id: number): void {
    this.documentService.cancelDocument(id);
  }

}
