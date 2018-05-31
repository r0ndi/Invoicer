import {Component} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {SwalService} from '../../../../services/swal/swal.service';

@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.scss']
})
export class NavItemsComponent {

  readonly applicationVersion = environment.applicationVersion;

  constructor(private swalService: SwalService) {
  }

  showApplicationVersion(): void {
    this.swalService.swalAlert.addInfo(`Wersja systemu: ${this.applicationVersion}`, 'Wersja systemu jest aktualna');
  }

}
