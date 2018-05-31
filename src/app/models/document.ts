import {Status} from './status';
import {PaymentMethod} from './payment-method';
import {Currency} from './currency';
import {Position} from './position';
import {InternalStatus} from './InternalStatus';

export interface Document {
  id: number;
  uid: string;
  documentType: DocumentType;
  dateSell: string;
  dateIssue: string;
  placeIssue: string;
  number: string;
  sellerName: string;
  sellerNip: string;
  sellerAddress: string;
  sellerCity: string;
  sellerPostcode: string;
  customerName: string;
  customerNip: string;
  customerAddress: string;
  customerCity: string;
  customerPostcode: string;
  positions: Array<Position>;
  status: Status;
  paymentMethod: PaymentMethod;
  currency: Currency;
  valueAmountPaid: number;
  termOfPayment: string;
  bankNo: string;
  internalStatus: InternalStatus;
  dateCreated: string;
  grossAmount?: number;
}
