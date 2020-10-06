import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import sk from '@angular/common/locales/sk';
import de from '@angular/common/locales/de';
import {AbstractNumberFieldComponent} from 'netgrif-application-engine';

registerLocaleData(en);
registerLocaleData(sk);
registerLocaleData(de);

@Component({
    selector: 'nc-number-currency-field',
    templateUrl: './number-currency-field.component.html',
    styleUrls: ['./number-currency-field.component.scss'],
    providers: [CurrencyPipe]
})
export class NumberCurrencyFieldComponent extends AbstractNumberFieldComponent implements OnInit {

    constructor(protected _translate: TranslateService,
                protected _currencyPipe: CurrencyPipe) {
        super(_translate);
    }

    ngOnInit(): void {
    }

    onFocusOut(event: Event) {
            const target = (event.target as HTMLInputElement);
            target.type = 'text';
            target.value = this.transformCurrency(target.value);
    }

    onFocusIn(input: HTMLInputElement) {
        input.type = 'number';
    }

    private transformCurrency(value: string): string {
        return this._currencyPipe.transform(
            parseFloat(value),
            this.dataField._formatFilter.code,
            'code',
            '1.' + this.dataField._formatFilter.fractionSize + '-' + this.dataField._formatFilter.fractionSize,
            this.dataField._formatFilter.locale);
    }
}
