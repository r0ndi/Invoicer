import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './index';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'Dashboard', url: 'home'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomePageRoutingModule {
}
