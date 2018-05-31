import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarInitials'
})
export class AvatarInitialsPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return 'IN';
    }

    const displayName = value.split(' ');
    return displayName.shift().charAt(0).toUpperCase() + displayName.shift().charAt(0).toUpperCase();
  }

}
