import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Injectable()
export class TitleService {
  private title: string;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setTitle();
      }
    });
  }

  public getTitle(): string {
    return this.title;
  }

  private setTitle(): void {
    this.title = this.getTitleFromRoute(this.router.routerState, this.router.routerState.root).pop();
  }

  private getTitleFromRoute(state, parent): string[] {
    const data = [];

    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitleFromRoute(state, state.firstChild(parent)));
    }

    return data;
  }
}
