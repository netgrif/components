import { AfterViewInit, Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe, getCurrencySymbol} from '@angular/common';
import {AbstractNumberErrorsComponent} from '../abstract-number-errors.component';

@Component({
    selector: 'ncc-abstract-currency-field',
    template: ''
})
export abstract class AbstractCurrencyNumberFieldComponent extends AbstractNumberErrorsComponent implements AfterViewInit {

    transformedValue: string;
    fieldType: string;
    public readonly NUMBER_TYPE = 'number';
    public readonly TEXT_TYPE = 'text';
    public readonly WHITESPACE = ' ';

    protected constructor(protected _currencyPipe: CurrencyPipe, translateService: TranslateService) {
        super(translateService);
    }

    ngAfterViewInit() {
        this.fieldType = this.TEXT_TYPE;
        this.transformedValue = this.transformCurrency(this.numberField.value?.toString());
        this.numberField.valueChanges().subscribe(value => {
            if (value !== undefined && value !== null) {
                if (this.fieldType === this.TEXT_TYPE) {
                    this.transformedValue = this.transformCurrency(value.toString()) + this.WHITESPACE;
                }
            } else {
                this.transformedValue = '';
            }
        });
    }

    transformToText(event: Event) {
        const target = (event.target as HTMLInputElement);
        this.fieldType = this.TEXT_TYPE;
        this.transformedValue = this.transformCurrency(target.value);
    }

    transformToNumber() {
        this.fieldType = this.NUMBER_TYPE;
        this.transformedValue = !!this.numberField.value ? this.numberField.value.toString() : '0';
    }

    getCurrencySymbol(): string {
        if (this.numberField._formatFilter === undefined) {
            return getCurrencySymbol(this.numberField.component.properties['code'],
                'wide', this.numberField.component.properties['locale']);
        }
        return getCurrencySymbol(this.numberField._formatFilter.code, 'wide', this.numberField._formatFilter.locale);
    }

    isNumberType(): boolean {
        return this.fieldType === this.NUMBER_TYPE;
    }

    private transformCurrency(value: string | undefined): string {
        value = !!value ? value : '0';
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
