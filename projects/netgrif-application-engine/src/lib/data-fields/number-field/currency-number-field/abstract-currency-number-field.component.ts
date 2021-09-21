import {Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe, getCurrencySymbol} from '@angular/common';
import {AbstractNumberErrorsComponent} from '../abstract-number-errors.component';
import {FormatFilter} from '../../models/format-filter';

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
        this.transformedValue = this.numberField.value.toString();
    }

    getCurrencySymbol(): string {
        const config = this.getCurrencyConfiguration();

        if (config === undefined) {
            throw new Error(`No currency format configuration is provided for number field with ID '${
                this.numberField.stringId}'! Value cannot be formatted`);
        }

        return getCurrencySymbol(config?.code, 'wide', config?.locale);
    }

    private transformCurrency(value: string): string {
        const config = this.getCurrencyConfiguration();
        const result = this._currencyPipe.transform(
            parseFloat(value),
            config?.code,
            'symbol',
            '1.' + config?.fractionSize + '-' + config?.fractionSize,
            config?.locale);

        if (result === null) {
            throw new Error(`CurrencyPipe could not format value of number field with ID '${this.numberField.stringId}'`);
        }
        return result;
    }

    private getCurrencyConfiguration(): FormatFilter | undefined {
        let source;
        if (this.numberField._formatFilter === undefined) {
            source = this.numberField.component?.properties as FormatFilter;
        } else {
            source = this.numberField._formatFilter;
        }
        return source;
    }
}
