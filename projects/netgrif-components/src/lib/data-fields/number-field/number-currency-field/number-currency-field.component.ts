import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe, registerLocaleData} from '@angular/common';
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

    constructor(protected _currencyPipe: CurrencyPipe, protected _translate: TranslateService) {
        super(_currencyPipe, _translate);
        registerLocaleData(en);
        registerLocaleData(sk);
        registerLocaleData(de);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    onFocusOut(event: Event) {
        this.transformToText(event);
    }

    onFocusIn() {
        this.transformToNumber();
    }
}
