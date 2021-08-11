import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractCurrencyNumberFieldComponent} from '@netgrif/application-engine';
import {CurrencyPipe} from '@angular/common';

@Component({
    selector: 'nc-number-currency-field',
    templateUrl: './number-currency-field.component.html',
    styleUrls: ['./number-currency-field.component.scss']
})
export class NumberCurrencyFieldComponent extends AbstractCurrencyNumberFieldComponent implements OnInit {

    constructor(currencyPipe: CurrencyPipe, translate: TranslateService) {
        super(currencyPipe, translate);
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
