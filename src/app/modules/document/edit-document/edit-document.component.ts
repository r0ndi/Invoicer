import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DocumentService} from '../../../services/document.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Document} from '../../../models/document';
import {PositionsSummary} from '../../../utils/positions-summary';
import {TaxRate} from '../../../models/tax-rate';
import {DocumentType} from '../../../models/document-type';
import {Currency} from '../../../models/currency';
import {Unit} from '../../../models/unit';
import {Status} from '../../../models/status';
import {PaymentMethod} from '../../../models/payment-method';
import {DocumentTypeService} from '../../../services/document-type.service';
import {StatusService} from '../../../services/status.service';
import {TaxRatesService} from '../../../services/tax-rates.service';
import {SwalService} from '../../../services/swal/swal.service';
import {UserService} from '../../../services/user.service';
import {UnitService} from '../../../services/unit.service';
import {CurrencyService} from '../../../services/currency.service';
import {PaymentMethodService} from '../../../services/payment-method.service';
import {Position} from '../../../models/position';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})
export class EditDocumentComponent implements OnInit {
  paymentMethods: Array<PaymentMethod> = [];
  documentTypes: Array<DocumentType> = [];
  positionsSummary: PositionsSummary;
  currencies: Array<Currency> = [];
  taxRates: Array<TaxRate> = [];
  statuses: Array<Status> = [];
  document: Document;
  units: Array<Unit> = [];
  documentForm: FormGroup;
  id: number;

  constructor(private route: ActivatedRoute,
              private unitService: UnitService,
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

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.documentService.getDocument(this.id)
        .subscribe((document: Document) => {
          this.document = document;
          this.documentForm = this.initDocument();
          this.calculateSummary();
        });
    });
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

  public editDocument({value, valid}: { value: Document, valid: boolean }): void {
    if (!valid) {
      this.swalService.swalDialog.addError('Uzupełnij obowiązkowe pola!');
      return;
    }

    value.uid = this.userService.getUid();
    value.internalStatus = this.document.internalStatus;
    this.documentService.editDocument(value);
  }

  public calculateSummary() {
    this.positionsSummary.resetData();
    this.documentForm.controls.positions.value.forEach(
      control => {
        this.positionsSummary.calculateSummary(control.price, control.quantity, control.taxRate);
      }
    );
  }

  private initDocument(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.document.id),
      documentType: new FormControl(this.document.documentType, [Validators.required]),
      number: new FormControl(this.document.number, [Validators.required]),
      dateSell: new FormControl(new Date(this.document.dateSell), [Validators.required]),
      dateIssue: new FormControl(new Date(this.document.dateIssue), [Validators.required]),
      placeIssue: new FormControl(this.document.placeIssue, [Validators.required]),
      sellerName: new FormControl(this.document.sellerName, [Validators.required]),
      sellerNip: new FormControl(this.document.sellerNip, [Validators.required]),
      sellerAddress: new FormControl(this.document.sellerAddress, [Validators.required]),
      sellerCity: new FormControl(this.document.sellerCity, [Validators.required]),
      sellerPostcode: new FormControl(this.document.sellerPostcode, [Validators.required, Validators.minLength(5), Validators.maxLength(6)]),
      customerName: new FormControl(this.document.customerName, [Validators.required]),
      customerNip: new FormControl(this.document.customerNip, [Validators.required]),
      customerAddress: new FormControl(this.document.customerAddress, [Validators.required]),
      customerCity: new FormControl(this.document.customerCity, [Validators.required]),
      customerPostcode: new FormControl(this.document.customerPostcode, [Validators.required, Validators.minLength(5), Validators.maxLength(6)]),
      status: new FormControl(this.document.status, [Validators.required]),
      paymentMethod: new FormControl(this.document.paymentMethod, [Validators.required]),
      currency: new FormControl(this.document.currency, [Validators.required]),
      valueAmountPaid: new FormControl(this.document.valueAmountPaid),
      termOfPayment: new FormControl(this.document.termOfPayment ? new Date(this.document.termOfPayment) : null),
      bankNo: new FormControl(this.document.bankNo),
      positions: this.initPositions()
    });
  }

  private initPositions(): FormArray {
    const positions = new FormArray([]);
    this.document.positions.forEach((position: Position) => {
      positions.push(
        new FormGroup({
          id: new FormControl(position.id),
          positionName: new FormControl(position.positionName, [Validators.required]),
          unit: new FormControl(position.unit, [Validators.required]),
          quantity: new FormControl(position.quantity, [Validators.required]),
          price: new FormControl(position.price, [Validators.required]),
          taxRate: new FormControl(position.taxRate, [Validators.required]),
        })
      );
    });

    return positions;
  }

  private initPosition(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      positionName: new FormControl(null, [Validators.required]),
      unit: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      taxRate: new FormControl(null, [Validators.required]),
    });
  }

}
