import {CanActivate, CanActivateChild, CanLoad, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
  }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        if (!loggedIn) {
          console.log('access denied')
          this.router.navigate(['/user/login']);
        }
      });
  }

  canLoad(): Observable<boolean> {
    return this.canActive();
  }

  canActivateChild(): Observable<boolean> {
    return this.canActive();
  }

  canActive(): Observable<boolean> {
    return this.afAuth.authState
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        if (!loggedIn) {
          console.log('access denied')
          this.router.navigate(['/user/login']);
        }
      });
  }
}
