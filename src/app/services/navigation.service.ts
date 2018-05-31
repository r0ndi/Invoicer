import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class NavigationService {
  active: Subject<boolean> = new Subject<boolean>();

  public openNavigation(): void {
    this.active.next(true);
  }

  public closeNavigation(): void {
    this.active.next(false);
  }

}
