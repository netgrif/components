import {Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe, getCurrencySymbol} from '@angular/common';
import {AbstractNumberErrorsComponent} from '../abstract-number-errors.component';

export abstract class AbstractCurrencyNumberFieldComponent extends AbstractNumberErrorsComponent implements OnInit {

    numberValue: number;
    @Input() transformedValue: string;
    fieldType: string;

    protected constructor(protected _currencyPipe: CurrencyPipe, translateService: TranslateService) {
        super(translateService);
    }

    ngOnInit() {
        if (this.numberField.value !== undefined) {
            this.transformedValue = this.transformCurrency(this.numberField.value.toString());
            this.numberValue = parseFloat(this.numberField.value.toString());
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
        return getCurrencySymbol(this.numberField._formatFilter.code, 'wide', this.numberField._formatFilter.locale);
    }

    private transformCurrency(value: string): string {
        return this._currencyPipe.transform(
            parseFloat(value),
            this.numberField._formatFilter.code,
            'symbol',
            '1.' + this.numberField._formatFilter.fractionSize + '-' + this.numberField._formatFilter.fractionSize,
            this.numberField._formatFilter.locale);
    }
}
