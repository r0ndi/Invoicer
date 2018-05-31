import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {TaxRatesService} from '../../../services/tax-rates.service';
import {TaxRate} from '../../../models/tax-rate';
import {UnitService} from '../../../services/unit.service';
import {Unit} from '../../../models/unit';
import {PositionsSummary} from '../../../utils/positions-summary';
import {DocumentType} from '../../../models/document-type';
import {DocumentTypeService} from '../../../services/document-type.service';
import {Status} from '../../../models/status';
import {StatusService} from '../../../services/status.service';
import {PaymentMethod} from '../../../models/payment-method';
import {PaymentMethodService} from '../../../services/payment-method.service';
import {Currency} from '../../../models/currency';
import {CurrencyService} from '../../../services/currency.service';
import {Document} from '../../../models/document';
import {SwalService} from '../../../services/swal/swal.service';
import {UserService} from '../../../services/user.service';
import {DocumentService} from '../../../services/document.service';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {
  positionsSummary: PositionsSummary;
  documentForm: FormGroup;
  documentFormSent = false;
  expectedNumber = '';
  documentTypes: Array<DocumentType> = [];
  taxRates: Array<TaxRate> = [];
  statuses: Array<Status> = [];
  units: Array<Unit> = [];
  currencies: Array<Currency> = [];
  paymentMethods: Array<PaymentMethod> = [];

  constructor(private unitService: UnitService,
              private statusService: StatusService,
              private taxRateService: TaxRatesService,
              private currencyService: CurrencyService,
              private documentTypeService: DocumentTypeService,
              private paymentMethodService: PaymentMethodService,
              private swalService: SwalService,
              private userService: UserService,
              private documentService: DocumentService) {
  }

  ngOnInit() {
    this.positionsSummary = new PositionsSummary();
    this.currencyService.getCurrencies().subscribe(currencies => this.currencies = currencies);
    this.documentTypeService.getDocumentTypes().subscribe(documentTypes => this.documentTypes = documentTypes);
    this.unitService.getUnits().subscribe(units => this.units = units);
    this.statusService.getStatuses().subscribe(statuses => this.statuses = statuses);
    this.paymentMethodService.getPaymentMethods().subscribe(paymentMethods => this.paymentMethods = paymentMethods);
    this.taxRateService.getTaxRates().subscribe(taxRates => this.taxRates = taxRates);

    this.initDocument();
    this.setDefaultTaxRates();
  }

  public addPosition(): void {
    const positions = <FormArray>this.documentForm.get('positions');
    positions.push(this.initPosition());
  }

  public deletePosition(index: number): void {
    const positions = <FormArray>this.documentForm.get('positions');
    positions.removeAt(index);
    this.calculateSummary();
  }

  public addDocument({value, valid}: { value: Document, valid: boolean }): void {
    this.documentFormSent = true;

    if (!valid) {
      this.swalService.swalDialog.addError('Uzupełnij obowiązkowe pola!');
      return;
    }

    value.uid = this.userService.getUid();
    this.documentService.addDocument(value);
  }

  public calculateSummary() {
    this.positionsSummary.resetData();
    this.documentForm.controls.positions.value.forEach(
      control => {
        this.positionsSummary.calculateSummary(control.price, control.quantity, control.taxRate);
      }
    );
  }

  private setDefaultTaxRates(): void {
    this.documentForm.get('documentType').valueChanges.subscribe(documentType => {
      if (documentType.id === this.documentTypeService.defaultZeroTaxId) {
        this.taxRateService.setDefaultZeroTaxRate();
      } else {
        this.taxRateService.setTaxRates();
      }
    });
  }

  private initDocument(): void {
    this.documentForm = new FormGroup({
      documentType: new FormControl(null, [Validators.required]),
      number: new FormControl(this.expectedNumber, [Validators.required]),
      dateSell: new FormControl(new Date(), [Validators.required]),
      dateIssue: new FormControl(new Date(), [Validators.required]),
      placeIssue: new FormControl(null, [Validators.required]),
      sellerName: new FormControl(null, [Validators.required]),
      sellerNip: new FormControl(null, [Validators.required]),
      sellerAddress: new FormControl(null, [Validators.required]),
      sellerCity: new FormControl(null, [Validators.required]),
      sellerPostcode: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(6)]),
      customerName: new FormControl(null, [Validators.required]),
      customerNip: new FormControl(null, [Validators.required]),
      customerAddress: new FormControl(null, [Validators.required]),
      customerCity: new FormControl(null, [Validators.required]),
      customerPostcode: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(6)]),
      positions: new FormArray([this.initPosition()]),
      status: new FormControl(null, [Validators.required]),
      paymentMethod: new FormControl(null, [Validators.required]),
      currency: new FormControl(null, [Validators.required]),
      valueAmountPaid: new FormControl(null),
      termOfPayment: new FormControl(new Date()),
      bankNo: new FormControl(null),
    });

    this.documentService.getExpectedNumber().subscribe(response => {
      if (response.number !== '') {
        this.documentForm.controls.number.setValue(response.number);
      }
    });
  }

  private initPosition(): FormGroup {
    return new FormGroup({
      positionName: new FormControl(null, [Validators.required]),
      unit: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      taxRate: new FormControl(null, [Validators.required]),
    });
  }

}
