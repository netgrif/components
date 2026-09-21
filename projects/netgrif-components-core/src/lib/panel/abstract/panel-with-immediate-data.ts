import {AbstractPanelWithHeaderBindingComponent} from './panel-with-header-binding';
import {NaeDate, toMoment} from '../../resources/types/nae-date-type';
import {DATE_FORMAT_STRING, DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {TranslateService} from '@ngx-translate/core';
import {Component, OnDestroy, Optional} from '@angular/core';
import {FeaturedValue} from './featured-value';
import {CurrencyPipe} from '@angular/common';
import {ImmediateData} from '../../resources/interface/immediate-data';
import {OverflowService} from '../../header/services/overflow.service';
import {I18nFieldValue} from "../../data-fields/i18n-field/models/i18n-field-value";

@Component({
    selector: 'ncc-abstract-panel-with-immediate',
    template: ''
})
export abstract class AbstractPanelWithImmediateDataComponent extends AbstractPanelWithHeaderBindingComponent implements OnDestroy {
    protected constructor(protected _translate: TranslateService,
                          protected _currencyPipe: CurrencyPipe,
                          @Optional() protected _overflowService: OverflowService) {
        super(_overflowService);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected parseImmediateValue(immediate: ImmediateData): FeaturedValue {
        if (immediate && immediate.value !== undefined || immediate && immediate.type === 'button') {
            switch (immediate.type) {
                case 'date':
                    return {
                        value: toMoment(immediate.value as NaeDate).format(DATE_FORMAT_STRING),
                        icon: 'event',
                        type: immediate.type
                    };
                case 'dateTime':
                    return {
                        value: toMoment(immediate.value as NaeDate).format(DATE_TIME_FORMAT_STRING),
                        icon: 'event',
                        type: immediate.type
                    };
                case 'enumeration':
                    return {value: this.getTranslation(immediate.value), icon: undefined, type: immediate.type};
                case 'multichoice':
                    return {
                        value: immediate.value.map(it => this.getTranslation(it)).join(', '),
                        icon: undefined,
                        type: immediate.type
                    };
                case 'enumeration_map':
                    return {
                        value: this.getTranslation(immediate.options[immediate.value]),
                        icon: undefined,
                        type: immediate.type
                    };
                case 'multichoice_map':
                    return {
                        value: immediate.value.map(it =>
                            this.getTranslation(immediate.options[it])).join(', '),
                        icon: undefined,
                        type: immediate.type
                    };
                case 'file':
                    return {value: immediate.value?.name, icon: 'insert_drive_file', type: immediate.type};
                case 'fileList':
                    return {
                        value: immediate.value?.namesPaths.map(obj => obj.name).join(', '),
                        icon: 'file_copy',
                        type: immediate.type
                    };
                case 'actorList':
                    return {value: immediate.value?.actorValues?.map(obj => obj.fullName).join(', '), icon: 'account_circle', type: immediate.type};
                case 'actor':
                    return {value: immediate.value?.fullName, icon: 'account_circle', type: immediate.type};
                case 'boolean':
                    return {
                        value: this._translate.instant('dataField.values.boolean.' + immediate.value),
                        icon: undefined, type: immediate.type
                    };
                case 'button':
                    let buttonValue: string;
                    if ((immediate as any).placeholder?.defaultValue !== undefined) {
                        buttonValue = this.getTranslation((immediate as any).placeholder);
                    } else if (immediate.name?.defaultValue !== undefined) {
                        buttonValue = this.getTranslation(immediate.name);
                    } else {
                        buttonValue = this._translate.instant('dialog.submit');
                    }
                    return {
                        value: buttonValue,
                        icon: undefined,
                        type: immediate.type
                    };
                case 'filter':
                    return {
                        value: undefined, icon: undefined, type: immediate.type,
                        filterMetadata: {filterMetadata: immediate.filterMetadata, allowedNets: immediate.allowedNets}
                    };
                case 'number':
                    if (immediate.format !== undefined) {
                        return this.formatCurrencyPipe(immediate.value, immediate.format.code, immediate.format.fractionSize,
                            immediate.format.locale, immediate.type);
                    } else if (immediate.component?.name === 'currency') {
                        return this.formatCurrencyPipe(immediate.value, immediate.component.properties['code'],
                            immediate.component.properties['fractionSize'], immediate.component.properties['locale'], immediate.type);
                    }
                    return {value: immediate.value, icon: undefined, type: immediate.type};
                default:
                    return {value: immediate.value, icon: undefined, type: immediate.type};
            }
        } else {
            return {value: '', icon: '', type: ''};
        }
    }

    protected getTranslation(i18n: I18nFieldValue | undefined): string {
        const locale = this._translate.currentLang;
        return (i18n && i18n.translations && locale in i18n.translations)
            ? i18n.translations[locale]
            : (i18n?.defaultValue ?? '');
    }

    protected formatCurrencyPipe(value: any, code: string, fraction: number, locale: string, type: string) {
        return {
            value:
                this._currencyPipe.transform(
                    parseFloat(value),
                    code,
                    'symbol',
                    '1.' + fraction + '-' + fraction,
                    locale),
            icon: undefined, type
        };
    }
}
