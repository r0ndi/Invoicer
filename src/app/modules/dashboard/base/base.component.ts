import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationService} from '../../../services/navigation.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseComponent {

  public isActiveMobileNavigation = false;

  constructor(private navService: NavigationService) {
    this.navService.active.subscribe(isActive => this.isActiveMobileNavigation = isActive);
  }

}
