import {PanelWithHeaderBinding} from './panel-with-header-binding';
import {NaeDate, toMoment} from '../../resources/types/nae-date-type';
import {DATE_FORMAT_STRING, DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {TranslateService} from '@ngx-translate/core';
import {OnDestroy} from '@angular/core';
import {FeaturedValue} from './featured-value';
import {CurrencyPipe} from '@angular/common';
import {ImmediateData} from '../../resources/interface/immediate-data';

export abstract class PanelWithImmediateData extends PanelWithHeaderBinding implements OnDestroy {
    protected constructor(protected _translate: TranslateService, protected _currencyPipe: CurrencyPipe) {
        super();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected parseImmediateValue(immediate: ImmediateData): FeaturedValue {
        if (immediate && immediate.value !== undefined || immediate && immediate.type === 'button') {
            switch (immediate.type) {
                case 'date':
                    return {value: toMoment(immediate.value as NaeDate).format(DATE_FORMAT_STRING), icon: 'event', type: immediate.type};
                case 'dateTime':
                    return {value: toMoment(immediate.value as NaeDate).format(DATE_TIME_FORMAT_STRING),
                        icon: 'event', type: immediate.type};
                case 'enumeration':
                    return {value: immediate.value.defaultValue, icon: undefined, type: immediate.type};
                case 'multichoice':
                    return {value: immediate.value.map(it => it.defaultValue).join(', '), icon: undefined, type: immediate.type};
                case 'file':
                    return {value: immediate.value, icon: 'insert_drive_file', type: immediate.type};
                case 'user':
                    return {value: immediate.value.fullName, icon: 'account_circle', type: immediate.type};
                case 'boolean':
                    return {value: this._translate.instant('dataField.values.boolean.' + immediate.value),
                        icon: undefined, type: immediate.type};
                case 'button':
                    return {value: (immediate as any).placeholder && (immediate as any).placeholder.defaultValue !== undefined
                            ? (immediate as any).placeholder.defaultValue : (immediate.name && immediate.name.defaultValue !== undefined
                                ? immediate.name.defaultValue : this._translate.instant('dialog.submit')),
                        icon: undefined, type: immediate.type};
                case 'filter':
                    return {value: undefined, icon: undefined, type: immediate.type,
                        filterMetadata: {filterMetadata: immediate.filterMetadata, allowedNets: immediate.allowedNets}};
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

    protected formatCurrencyPipe(value: any, code: string, fraction: number, locale: string, type: string) {
        return {value:
                this._currencyPipe.transform(
                parseFloat(value),
                code,
                'symbol',
                '1.' + fraction + '-' + fraction,
                locale),
                icon: undefined, type};
    }
}
