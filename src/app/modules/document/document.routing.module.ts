import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateDocumentComponent} from './create-document/create-document.component';
import {DocumentListComponent} from './document-list/document-list.component';
import {EditDocumentComponent} from './edit-document/edit-document.component';

const routes: Routes = [{
  path: '',
  data: {title: 'Dokument', url: 'document'},
  children: [
    {path: '', redirectTo: '/document/list', pathMatch: 'full'},
    {path: 'list', component: DocumentListComponent, data: {'title': 'Lista dokumentów', url: 'document'}},
    {path: 'create', component: CreateDocumentComponent, data: {title: 'Kreator dokumentu', url: 'document/create'}},
    {path: 'edit/:id', component: EditDocumentComponent, data: {title: 'Edycja dokumentu', 'url:': ''}}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule {

}
