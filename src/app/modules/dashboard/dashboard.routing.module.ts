import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseComponent} from './base/base.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', loadChildren: '../welcome-page/welcome-page.module#WelcomePageModule'},
      {path: 'document', loadChildren: '../document/document.module#DocumentModule'},
      {path: 'documentation', loadChildren: '../documentation/documentation.module#DocumentationModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
