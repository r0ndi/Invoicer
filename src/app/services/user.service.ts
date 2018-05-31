import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {
  private uid: string;
  private displayName: string;
  private email: string;
  private firstName: string;
  private lastName: string;

  constructor(private authService: AuthService, private angularFire: AngularFireAuth) {
    this.angularFire.authState
      .subscribe(user => {
        this.init(user);
      });
  }

  init(user) {
    if (!this.authService.authorized()) {
      return;
    }

    let displayName = 'No Name';
    if (user.displayName !== null) {
      displayName = user.displayName;
    }

    const currentUser = displayName.split(' ');

    this.uid = user.uid;
    this.email = user.email;
    this.displayName = displayName;
    this.firstName = currentUser.shift();
    this.lastName = currentUser.shift();
  }

  getUid(): string {
    return this.uid;
  }

  getDisplayName(): string {
    return this.displayName;
  }

  getEmail(): string {
    return this.email;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }
}
