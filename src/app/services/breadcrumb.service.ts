import {Injectable} from '@angular/core';
import {IBreadcrumb} from '../models/IBreadcrumb';
import {ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router} from '@angular/router';

@Injectable()
export class BreadcrumbService {
  private breadcrumbs: IBreadcrumb[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        this.breadcrumbs = this.getIBreadcrumbs(this.activatedRoute.root);
      });
  }

  public getBreadcrumbs(): IBreadcrumb[] {
    return this.breadcrumbs;
  }

  private getIBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      if (!child.snapshot.data.hasOwnProperty('title')) {
        return this.getIBreadcrumbs(child, url, breadcrumbs);
      }

      if (child.snapshot.data.hasOwnProperty('url') && child.snapshot.data['url'] !== '') {
        url = `/${child.snapshot.data['url']}`;
      }

      const breadcrumb: IBreadcrumb = {
        label: child.snapshot.data['title'],
        params: child.snapshot.params,
        url: url
      };

      breadcrumbs.push(breadcrumb);
      return this.getIBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
