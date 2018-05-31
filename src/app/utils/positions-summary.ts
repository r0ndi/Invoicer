import {TaxRate} from '../models/tax-rate';

export class PositionsSummary {
  sumGrossAmount: number;
  sumNetAmount: number;
  sumTaxAmount: number;

  constructor(sumNetAmount = 0, sumTaxAmount = 0, sumGrossAmount = 0) {
    this.sumGrossAmount = sumGrossAmount;
    this.sumNetAmount = sumNetAmount;
    this.sumTaxAmount = sumTaxAmount;
  }

  public getSumNetAmount(): number {
    return this.sumNetAmount;
  }

  public getSumGrossAmount(): number {
    return this.sumGrossAmount;
  }

  public getSumTaxAmount(): number {
    return this.sumTaxAmount;
  }

  public setSumNetAmount(sumNetAmount: number): void {
    this.sumNetAmount = sumNetAmount;
  }

  public setSumGrossAmount(sumGrossAmount: number): void {
    this.sumGrossAmount = sumGrossAmount;
  }

  public setSumTaxAmount(sumTaxAmount: number): void {
    this.sumTaxAmount = sumTaxAmount;
  }

  public resetData(): void {
    this.setSumGrossAmount(0);
    this.setSumNetAmount(0);
    this.setSumTaxAmount(0);
  }

  public calculateSummary(price: any, quantity: any, taxRate: TaxRate): void {
    let amount = 0;
    const taxValue = taxRate !== null && parseFloat(taxRate.rate) > 0 ? parseFloat(taxRate.rate) / 100 : 0;
    quantity = parseFloat(quantity) > 0 ? parseFloat(quantity) : 0;

    if (price !== null) {
      amount = parseFloat(price.replace(',', '.')) > 0 ? parseFloat(price.replace(',', '.')) : 0;
    }

    const netAmount = quantity * amount;
    const grossAmount = taxValue > 0 ? netAmount + (taxValue * netAmount) : netAmount;

    this.sumNetAmount += netAmount;
    this.sumTaxAmount += netAmount * taxValue;
    this.sumGrossAmount += grossAmount;
  }
}
