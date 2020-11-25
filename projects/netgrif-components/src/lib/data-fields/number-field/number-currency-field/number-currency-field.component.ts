import {Component, Inject, OnInit, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import sk from '@angular/common/locales/sk';
import de from '@angular/common/locales/de';
import {AbstractCurrencyNumberFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/application-engine';

@Component({
    selector: 'nc-number-currency-field',
    templateUrl: './number-currency-field.component.html',
    styleUrls: ['./number-currency-field.component.scss'],
    providers: [CurrencyPipe]
})
export class NumberCurrencyFieldComponent extends AbstractCurrencyNumberFieldComponent implements OnInit {

    constructor(protected _currencyPipe: CurrencyPipe, protected _translate: TranslateService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(_currencyPipe, _translate, informAboutInvalidData);
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
