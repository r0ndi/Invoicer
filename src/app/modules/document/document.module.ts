import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateDocumentComponent} from './create-document/create-document.component';
import {DocumentRoutingModule} from './document.routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule, DatepickerModule} from 'ngx-bootstrap';
import {PriceFormatPipe} from '../../shared/price-format';
import {DocumentListComponent} from './document-list/document-list.component';
import {DataTablesModule} from 'angular-datatables';
import {DateFormatPipe} from '../../shared/date-format';
import {EditDocumentComponent} from './edit-document/edit-document.component';

@NgModule({
  declarations: [
    CreateDocumentComponent,
    DocumentListComponent,
    EditDocumentComponent,
    PriceFormatPipe,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    DataTablesModule
  ]
})
export class DocumentModule {
}
