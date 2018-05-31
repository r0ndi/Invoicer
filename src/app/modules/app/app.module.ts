import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {AuthService} from '../../services/auth.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../../../environments/environment';
import {AuthGuardService} from '../../services/auth-guard.service';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {SwalService} from '../../services/swal/swal.service';
import {UserService} from '../../services/user.service';
import {NavigationService} from '../../services/navigation.service';
import {TitleService} from '../../services/title.service';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {TaxRatesService} from '../../services/tax-rates.service';
import {UnitService} from '../../services/unit.service';
import {DocumentTypeService} from '../../services/document-type.service';
import {BsDatepickerModule, DatepickerModule} from 'ngx-bootstrap';
import {StatusService} from '../../services/status.service';
import {PaymentMethodService} from '../../services/payment-method.service';
import {CurrencyService} from '../../services/currency.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SwalAlertService} from '../../services/swal/swal.alert.service';
import {HttpErrorHandler} from '../../exceptions/httpErrorHandler';
import {SwalDialogService} from '../../services/swal/swal.dialog.service';
import {AuthInterceptor} from '../../shared/auth.interceptor';
import {DocumentService} from '../../services/document.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.fireBaseConfig),
    AngularFireAuthModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    SwalService,
    SwalAlertService,
    SwalDialogService,
    UserService,
    NavigationService,
    TitleService,
    BreadcrumbService,
    TaxRatesService,
    UnitService,
    DocumentTypeService,
    StatusService,
    PaymentMethodService,
    CurrencyService,
    DocumentService,
    HttpErrorHandler,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
