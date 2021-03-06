import {RouterModule, Routes} from '@angular/router';
import {DocumentationComponent} from './documentation.component';
import {NgModule} from '@angular/core';

const routes: Routes = [{
  path: '', component: DocumentationComponent, data: {title: 'Dokumentacja', url: 'documentation'},
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule {
}
