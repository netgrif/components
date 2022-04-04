import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe, getCurrencySymbol} from '@angular/common';
import {AbstractNumberErrorsComponent} from '../abstract-number-errors.component';

@Component({
    selector: 'ncc-abstract-currency-field',
    template: ''
})
export abstract class AbstractCurrencyNumberFieldComponent extends AbstractNumberErrorsComponent implements OnInit {

    @Input() transformedValue: string;
    fieldType: string;

    protected constructor(protected _currencyPipe: CurrencyPipe, translateService: TranslateService) {
        super(translateService);
    }

    ngOnInit() {
        this.fieldType = 'text';
        this.transformedValue = this.transformCurrency(this.numberField.value.toString());
        this.numberField.valueChanges().subscribe(value => {
            if (value !== undefined) {
                if (this.fieldType === 'text') {
                    this.transformedValue = this.transformCurrency(value.toString());
                }
            } else {
                this.transformedValue = '';
            }
        });
    }

    transformToText(event: Event) {
        const target = (event.target as HTMLInputElement);
        this.fieldType = 'text';
        this.transformedValue = this.transformCurrency(target.value);
    }

    transformToNumber() {
        this.fieldType = 'number';
        this.transformedValue = this.numberField.value?.toString();
    }

    getCurrencySymbol(): string {
        if (this.numberField._formatFilter === undefined) {
            return getCurrencySymbol(this.numberField.component.properties['code'],
                'wide', this.numberField.component.properties['locale']);
        }
        return getCurrencySymbol(this.numberField._formatFilter.code, 'wide', this.numberField._formatFilter.locale);
    }

    private transformCurrency(value: string): string {
        if (this.numberField._formatFilter === undefined) {
            return this._currencyPipe.transform(
                parseFloat(value),
                this.numberField.component.properties['code'],
                'symbol',
                '1.' + this.numberField.component.properties['fractionSize'] + '-' + this.numberField.component.properties['fractionSize'],
                this.numberField.component.properties['locale']);
        }
        return this._currencyPipe.transform(
            parseFloat(value),
            this.numberField._formatFilter.code,
            'symbol',
            '1.' + this.numberField._formatFilter.fractionSize + '-' + this.numberField._formatFilter.fractionSize,
            this.numberField._formatFilter.locale);
    }
}
