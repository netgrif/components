import {AfterViewInit, Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractCurrencyNumberFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    NumberField, ValidationRegistryService
} from '@netgrif/components-core';
import {CurrencyPipe} from '@angular/common';

@Component({
    selector: 'nc-number-currency-field',
    templateUrl: './number-currency-field.component.html',
    styleUrls: ['./number-currency-field.component.scss']
})
export class NumberCurrencyFieldComponent extends AbstractCurrencyNumberFieldComponent {

    constructor(currencyPipe: CurrencyPipe,
                translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>) {
        super(currencyPipe, translate, validationRegistry, dataFieldPortalData);
    }

    onFocusOut(event: Event) {
        this.transformToText(event);
    }

    onFocusIn() {
        this.transformToNumber();
    }

    isCodeExists() {
        return this.dataField.component.properties['code'] !== ' ' &&
            this.dataField.component.properties['code'] !== '' &&
            this.dataField.component.properties['code'] !== undefined;
    }
}
