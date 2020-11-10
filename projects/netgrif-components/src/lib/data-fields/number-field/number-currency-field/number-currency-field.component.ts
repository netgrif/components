import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe, registerLocaleData, getCurrencySymbol} from '@angular/common';
import en from '@angular/common/locales/en';
import sk from '@angular/common/locales/sk';
import de from '@angular/common/locales/de';
import {AbstractCurrencyNumberFieldComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-number-currency-field',
    templateUrl: './number-currency-field.component.html',
    styleUrls: ['./number-currency-field.component.scss'],
    providers: [CurrencyPipe]
})
export class NumberCurrencyFieldComponent extends AbstractCurrencyNumberFieldComponent implements OnInit {

    private numberValue: number;
    @Input() transformedValue: string;
    fieldType: string;

    constructor(protected _currencyPipe: CurrencyPipe, protected _translate: TranslateService) {
        super(_translate);
        registerLocaleData(en);
        registerLocaleData(sk);
        registerLocaleData(de);
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

    onFocusOut(event: Event) {
        const target = (event.target as HTMLInputElement);
        this.numberValue = parseFloat(target.value);
        this.fieldType = 'text';
        this.transformedValue = this.transformCurrency(target.value);
    }

    onFocusIn() {
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
