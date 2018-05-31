import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseComponent} from './base/base.component';
import {DashboardRoutingModule} from './dashboard.routing.module';
import {WelcomePageModule} from '../welcome-page/welcome-page.module';
import {HeaderComponent} from './header/header.component';
import {NavigationComponent} from './navigation/navigation.component';
import {FooterComponent} from './footer/footer.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {AvatarInitialsPipe} from '../../shared/avatar-initials.pipe';
import {MobileNavigationComponent} from './navigation/mobile-navigation/mobile-navigation.component';
import {NavItemsComponent} from './navigation/nav-items/nav-items.component';
import {DocumentModule} from '../document/document.module';
import {BreadcrumbComponent} from './header/breadcrumb/breadcrumb.component';
import {DocumentationModule} from '../documentation/documentation.module';

@NgModule({
  declarations: [
    BaseComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    MobileNavigationComponent,
    AvatarInitialsPipe,
    NavItemsComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    WelcomePageModule,
    DocumentModule,
    DocumentationModule,
    BsDropdownModule.forRoot(),
  ]
})
export class DashboardModule {
}
