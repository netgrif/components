import {AfterViewInit, Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe, getCurrencySymbol} from '@angular/common';
import {AbstractNumberErrorsComponent} from '../abstract-number-errors.component';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {NumberField} from "../models/number-field";

@Component({
    selector: 'ncc-abstract-currency-field',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractCurrencyNumberFieldComponent extends AbstractNumberErrorsComponent implements AfterViewInit {

    /** currency of a currency field without the `code` property */
    public static readonly DEFAULT_CURRENCY = 'EUR';
    /** decimal places of a currency field without the `fractionSize` property */
    public static readonly DEFAULT_FRACTION_SIZE = 2;

    transformedValue: string;
    fieldType: string;
    public readonly NUMBER_TYPE = 'number';
    public readonly TEXT_TYPE = 'text';
    public readonly WHITESPACE = ' ';

    protected constructor(protected _currencyPipe: CurrencyPipe, translateService: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>) {
        super(translateService, dataFieldPortalData);
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
        const format = this.currencyFormat();
        return getCurrencySymbol(format.code, 'wide', format.locale);
    }

    isNumberType(): boolean {
        return this.fieldType === this.NUMBER_TYPE;
    }

    private transformCurrency(value: string | undefined): string {
        value = !!value ? value : '0';
        const format = this.currencyFormat();
        return this._currencyPipe.transform(parseFloat(value), format.code, 'symbol',
            '1.' + format.fractionSize + '-' + format.fractionSize, format.locale);
    }

    /**
     * The format of the currency: the format filter of the field, or the properties of its component (`code`,
     * `fractionSize`, `locale`); a property that is not set has a default (EUR, 2 decimal places, the locale of the
     * application), the currency pipe failed on `1.undefined-undefined` without them.
     */
    protected currencyFormat(): {code: string, fractionSize: number, locale: string | undefined} {
        const source = this.dataField._formatFilter ?? this.dataField.component?.properties ?? {};
        const fractionSize = parseInt(source['fractionSize'], 10);
        return {
            code: source['code'] || AbstractCurrencyNumberFieldComponent.DEFAULT_CURRENCY,
            fractionSize: Number.isNaN(fractionSize) ? AbstractCurrencyNumberFieldComponent.DEFAULT_FRACTION_SIZE : fractionSize,
            locale: source['locale'] || undefined,
        };
    }
}
