import {Inject, Input, OnInit, Optional} from '@angular/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TranslateService} from '@ngx-translate/core';
import {AbstractNumberFieldComponent} from '../abstract-number-field.component';
import {FormControl} from '@angular/forms';
import {CurrencyPipe, getCurrencySymbol} from '@angular/common';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../../models/invalid-data-policy-token';


export abstract class AbstractCurrencyNumberFieldComponent extends AbstractNumberFieldComponent implements OnInit {
    @Input() showLargeLayout: WrappedBoolean;
    @Input() formControlRef: FormControl;

    numberValue: number;
    @Input() transformedValue: string;
    fieldType: string;

    constructor(protected _currencyPipe: CurrencyPipe, private _translateService: TranslateService) {
        super(_translateService);
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.dataField.value !== undefined) {
            this.transformedValue = this.transformCurrency(this.dataField.value.toString());
            this.numberValue = parseFloat(this.dataField.value.toString());
        } else {
            this.transformedValue = '';
            this.numberValue = 0.0;
        }
    }

    transformToText(event: Event) {
        const target = (event.target as HTMLInputElement);
        this.numberValue = parseFloat(target.value);
        this.fieldType = 'text';
        this.transformedValue = this.transformCurrency(target.value);
    }

    transformToNumber() {
        this.fieldType = 'number';
        this.transformedValue = this.numberValue.toString();
    }

    getCurrencySymbol(): string {
        return getCurrencySymbol(this.dataField._formatFilter.code, 'wide', this.dataField._formatFilter.locale);
    }

    private transformCurrency(value: string): string {
        return this._currencyPipe.transform(
            parseFloat(value),
            this.dataField._formatFilter.code,
            'symbol',
            '1.' + this.dataField._formatFilter.fractionSize + '-' + this.dataField._formatFilter.fractionSize,
            this.dataField._formatFilter.locale);
    }
}
