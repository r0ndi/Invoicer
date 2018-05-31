import {Component} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import {NavigationService} from '../../../services/navigation.service';
import {TitleService} from '../../../services/title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService: AuthService,
              public titleService: TitleService,
              public userInfo: UserService,
              private navService: NavigationService) {
  }

  signOut() {
    this.authService.signOut();
  }

  openNavigation(): void {
    this.navService.openNavigation();
  }
}
