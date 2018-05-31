import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from 'firebase/app';
import {Router} from '@angular/router';
import {SwalService} from './swal/swal.service';

@Injectable()
export class AuthService {

  user: User;

  constructor(public angularFire: AngularFireAuth, private router: Router, private swalService: SwalService) {
    this.angularFire.authState
      .subscribe(user => {
        this.user = user;
      });
  }

  authorized(): boolean {
    return this.angularFire.auth.currentUser !== null;
  }

  signIn(email: string, password: string): void {
    this.angularFire.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.router.navigate(['/home']);
      })
      .catch(err => {
        this.swalService.swalAlert.addError('Wystąpił błąd!', err.message);
      });
  }

  register(email: string, password: string, firstName: string, lastName: string): void {
    this.angularFire.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.updateDisplayName(firstName + ' ' + lastName)
          .then(userUpdated => {
            this.user = userUpdated;
            this.router.navigate(['/home']);
            this.swalService.swalAlert.addSuccess('Witaj ' + firstName + '!', 'Pomyślnie utworzyłeś konto w naszym systemie.');
          }).catch(err => {
          this.swalService.swalAlert.addError('Wystąpił błąd!', err.message);
        });
      }).catch(err => {
      this.swalService.swalAlert.addError('Wystąpił błąd!', err.message);
    });
  }

  signOut(): void {
    this.angularFire.auth.signOut();
    this.router.navigate(['/user/login']);
  }

  updateDisplayName(name: string): Promise<any> {
    return this.angularFire.auth.currentUser.updateProfile({displayName: name, photoURL: null});
  }
}
