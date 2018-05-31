import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    return this.formatDate(value);
  }

  private formatDate(date: string): string {
    const time = new Date(date);
    return time.toLocaleDateString() + ' ' + time.toLocaleTimeString();
  }

}
