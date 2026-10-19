import {AfterViewInit, Component, Inject, Optional} from '@angular/core';
import {AbstractNumberErrorsComponent} from '../abstract-number-errors.component';
import {DecimalPipe, getLocaleId, getLocaleNumberSymbol, NumberSymbol} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from '../../models/data-field-portal-data-injection-token';
import {NumberField} from '../models/number-field';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {NumberFormatter} from '../models/number-formatter';
import {DEFAULT_NUMBER_FORMAT, NumberFormat} from '../models/number-format';
import {LoggerService} from '../../../logger/services/logger.service';

@Component({
    selector: 'ncc-abstract-number-decimal-field',
    template: ''
})
export abstract class AbstractNumberDecimalFieldComponent extends AbstractNumberErrorsComponent implements AfterViewInit {

    transformedValue: string;
    fieldType: string;
    public readonly NUMBER_TYPE = 'number';
    public readonly TEXT_TYPE = 'text';
    public readonly WHITESPACE = ' ';
    public readonly DECIMAL_COMPONENT = 'decimal';
    public readonly FORMATTED_COMPONENT = 'formatted';
    protected readonly _unregisteredLocales = new Set<string>();

    protected constructor(protected _decimalPipe: DecimalPipe,
                          _translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>,
                          @Optional() protected _configService?: ConfigurationService,
                          @Optional() protected _log?: LoggerService) {
        super(_translate, dataFieldPortalData);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.fieldType = this.TEXT_TYPE;
            this.transformedValue = this.transformDecimal(this.dataField.value?.toString());
            this.dataField.valueChanges().subscribe(value => {
                if (value !== undefined && value !== null) {
                    if (this.fieldType === this.TEXT_TYPE) {
                        this.transformedValue = this.transformDecimal(value.toString());
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
        this.transformedValue = this.transformDecimal(target.value);
    }

    transformToNumber() {
        this.fieldType = this.NUMBER_TYPE;
        this.transformedValue = !!this.dataField.value ? this.dataField.value.toString() : '0';
    }

    isNumberType(): boolean {
        return this.fieldType === this.NUMBER_TYPE;
    }

    isFormattedComponent(): boolean {
        return this.dataField.component?.name === this.FORMATTED_COMPONENT;
    }

    private transformDecimal(value: string | undefined): string {
        value = !!value ? value : '0';
        if (!this.dataField.component) {
            return value;
        }
        if (this.isFormattedComponent()) {
            return this.transformFormatted(Number.parseFloat(value));
        }
        return this.transformWithDecimalPipe(Number.parseFloat(value));
    }

    /**
     * Transformation of the `decimal` component using the angular `DecimalPipe` with the `digitsInfo` and `locale` properties.
     */
    protected transformWithDecimalPipe(value: number): string {
        return this._decimalPipe.transform(
            value,
            this.dataField.component.properties?.['digitsInfo'],
            this.dataField.component.properties?.['locale']);
    }

    /**
     * Transformation of the `formatted` component using the {@link NumberFormatter}.
     * If the resolved `digitsInfo` is malformed, a warning is logged and the {@link DEFAULT_NUMBER_FORMAT} `digitsInfo`
     * is used instead, while the resolved separators are preserved.
     */
    protected transformFormatted(value: number): string {
        const format = this.resolveNumberFormat();
        let formatter: NumberFormatter;
        try {
            formatter = new NumberFormatter(format);
        } catch (e) {
            this._log?.warn(`Invalid digitsInfo '${format.digitsInfo}' of number field '${this.dataField.stringId}',`
                + ` default digitsInfo '${DEFAULT_NUMBER_FORMAT.digitsInfo}' is used instead.`, e);
            formatter = new NumberFormatter({...format, digitsInfo: DEFAULT_NUMBER_FORMAT.digitsInfo});
        }
        return formatter.format(value);
    }

    /**
     * Resolves the number format of the `formatted` component. Each attribute is resolved independently in this order:
     * 1. the component properties (`decimalSeparator`, `groupSeparator`, `digitsInfo`),
     * 2. the separators of the `locale` component property (the same property as supported by the `decimal` component),
     *    if the locale data are registered,
     * 3. the `services.dataFields.defaultNumberFormat` configuration in `nae.json`,
     * 4. the {@link DEFAULT_NUMBER_FORMAT}.
     */
    protected resolveNumberFormat(): Required<NumberFormat> {
        const properties = this.dataField.component?.properties ?? {};
        const localeFormat = this.resolveLocaleNumberFormat(properties['locale']);
        const defaultFormat = this.resolveDefaultNumberFormat();
        return {
            decimalSeparator: properties['decimalSeparator'] ?? localeFormat.decimalSeparator ?? defaultFormat.decimalSeparator,
            groupSeparator: properties['groupSeparator'] ?? localeFormat.groupSeparator ?? defaultFormat.groupSeparator,
            digitsInfo: properties['digitsInfo'] ?? defaultFormat.digitsInfo
        };
    }

    /**
     * @returns the `services.dataFields.defaultNumberFormat` configuration from `nae.json` completed by the {@link DEFAULT_NUMBER_FORMAT}
     */
    protected resolveDefaultNumberFormat(): Required<NumberFormat> {
        const configured: NumberFormat = this._configService?.getDatafieldConfiguration()?.defaultNumberFormat ?? {};
        return {
            decimalSeparator: configured.decimalSeparator ?? DEFAULT_NUMBER_FORMAT.decimalSeparator,
            groupSeparator: configured.groupSeparator ?? DEFAULT_NUMBER_FORMAT.groupSeparator,
            digitsInfo: configured.digitsInfo ?? DEFAULT_NUMBER_FORMAT.digitsInfo
        };
    }

    /**
     * @returns the decimal and group separators of the given locale, or an empty format if no locale is provided
     * or the locale data are not registered
     */
    protected resolveLocaleNumberFormat(locale: string | undefined): NumberFormat {
        if (!locale || !this.isLocaleRegistered(locale)) {
            return {};
        }
        return {
            decimalSeparator: getLocaleNumberSymbol(locale, NumberSymbol.Decimal),
            groupSeparator: getLocaleNumberSymbol(locale, NumberSymbol.Group)
        };
    }

    /**
     * @returns `true` if the locale data are registered (see `registerLocaleData` from `@angular/common`).
     * A warning is logged once for each unregistered locale.
     */
    protected isLocaleRegistered(locale: string): boolean {
        if (this._unregisteredLocales.has(locale)) {
            return false;
        }
        try {
            getLocaleId(locale);
            return true;
        } catch (e) {
            this._unregisteredLocales.add(locale);
            this._log?.warn(`Locale data for locale '${locale}' of number field '${this.dataField.stringId}' are not registered,`
                + ` default number format from the configuration is used instead.`);
            return false;
        }
    }
}
