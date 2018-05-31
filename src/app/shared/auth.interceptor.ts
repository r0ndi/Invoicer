import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private headers: HttpHeaders;

  constructor(private userService: UserService) {
    this.setHeaders();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(req.clone({headers: this.headers}));
  }

  private setHeaders(): void {
    this.headers = new HttpHeaders()
      .set('Uid', this.userService.getUid());
  }

}
