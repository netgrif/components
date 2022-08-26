import { AfterViewInit, Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractCurrencyNumberFieldComponent} from '@netgrif/components-core';
import {CurrencyPipe} from '@angular/common';

@Component({
    selector: 'nc-number-currency-field',
    templateUrl: './number-currency-field.component.html',
    styleUrls: ['./number-currency-field.component.scss']
})
export class NumberCurrencyFieldComponent extends AbstractCurrencyNumberFieldComponent implements AfterViewInit {

    constructor(currencyPipe: CurrencyPipe, translate: TranslateService) {
        super(currencyPipe, translate);
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    onFocusOut(event: Event) {
        this.transformToText(event);
    }

    onFocusIn() {
        this.transformToNumber();
    }
}
