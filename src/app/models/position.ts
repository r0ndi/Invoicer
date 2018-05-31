import {Unit} from './unit';
import {TaxRate} from './tax-rate';

export interface Position {
  id: number;
  positionName: string;
  unit: Unit;
  price: number;
  quantity: number;
  taxRate: TaxRate;
  grossPrice?: number;
}
