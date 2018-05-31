import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent {

  readonly applicationVersion = environment.applicationVersion;
  readonly currentYear = (new Date()).getFullYear();

  constructor() {
  }

}
