import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (value <= 0) {
      return '0zł';
    }

    value = this.round(value);
    if (value <= 0) {
      return '0zł';
    }

    return value.toString().replace('.', ',') + 'zł';
  }

  private round(number: number, precision: number = 2): number {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
}
