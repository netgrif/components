import {AfterViewInit, Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe, getCurrencySymbol} from '@angular/common';
import {AbstractNumberErrorsComponent} from '../abstract-number-errors.component';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {NumberField} from "../models/number-field";
import {ValidationRegistryService} from "../../../registry/validation/validation-registry.service";

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

    protected constructor(protected _currencyPipe: CurrencyPipe, translateService: TranslateService,
                          validationRegistry: ValidationRegistryService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>) {
        super(translateService, validationRegistry, dataFieldPortalData);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.fieldType = this.TEXT_TYPE;
            this.transformedValue = this.transformCurrency(this.dataField.value?.toString());
            this.dataField.valueChanges().subscribe(value => {
                if (value !== undefined && value !== null) {
                    if (this.fieldType === this.TEXT_TYPE) {
                        this.transformedValue = this.transformCurrency(value.toString()) + this.WHITESPACE;
                    }
                } else {
                    this.transformedValue = '';
                }
            });
        })
    }

    transformToText(event: Event) {
        const target = (event.target as HTMLInputElement);
        this.fieldType = this.TEXT_TYPE;
        this.transformedValue = this.transformCurrency(target.value);
    }

    transformToNumber() {
        this.fieldType = this.NUMBER_TYPE;
        this.transformedValue = !!this.dataField.value ? this.dataField.value.toString() : '0';
    }

    getCurrencySymbol(): string {
        if (this.dataField._formatFilter === undefined) {
            return getCurrencySymbol(this.dataField.component.properties['code'],
                'wide', this.dataField.component.properties['locale']);
        }
        return getCurrencySymbol(this.dataField._formatFilter.code, 'wide', this.dataField._formatFilter.locale);
    }

    isNumberType(): boolean {
        return this.fieldType === this.NUMBER_TYPE;
    }

    private transformCurrency(value: string | undefined): string {
        value = !!value ? value : '0';
        if (this.dataField._formatFilter === undefined) {
            return this._currencyPipe.transform(
                parseFloat(value),
                this.dataField.component.properties['code'],
                'symbol',
                '1.' + this.dataField.component.properties['fractionSize'] + '-' + this.dataField.component.properties['fractionSize'],
                this.dataField.component.properties['locale']);
        }
        return this._currencyPipe.transform(
            parseFloat(value),
            this.dataField._formatFilter.code,
            'symbol',
            '1.' + this.dataField._formatFilter.fractionSize + '-' + this.dataField._formatFilter.fractionSize,
            this.dataField._formatFilter.locale);
    }
}
