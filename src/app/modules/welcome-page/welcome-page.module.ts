import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {WelcomePageRoutingModule} from './welcome-page.routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    WelcomePageRoutingModule
  ]
})
export class WelcomePageModule {
}
