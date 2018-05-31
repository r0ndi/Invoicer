import {Component} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET} from '@angular/router';
import {IBreadcrumb} from '../../../../models/IBreadcrumb';
import 'rxjs/add/operator/filter';
import {BreadcrumbService} from '../../../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  constructor(public breadcrumbService: BreadcrumbService) {
  }

}
