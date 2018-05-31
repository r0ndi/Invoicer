import {Component} from '@angular/core';
import {NavigationService} from '../../../../services/navigation.service';

@Component({
  selector: 'app-mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.scss']
})
export class MobileNavigationComponent {

  constructor(private navService: NavigationService) {
  }

  closeNavigation(): void {
    this.navService.closeNavigation();
  }

}
