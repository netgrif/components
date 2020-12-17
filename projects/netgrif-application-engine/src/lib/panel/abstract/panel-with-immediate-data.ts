import {PanelWithHeaderBinding} from './panel-with-header-binding';
import {NaeDate, toMoment} from '../../resources/types/nae-date-type';
import {DATE_FORMAT_STRING, DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {TranslateService} from '@ngx-translate/core';

export abstract class PanelWithImmediateData extends PanelWithHeaderBinding {
    protected constructor(protected _translate: TranslateService) {
        super();
    }

    protected parseImmediateValue(immediate) {
        if (immediate && immediate.value !== undefined) {
            switch (immediate.type) {
                case 'date':
                    return {value: toMoment(immediate.value as NaeDate).format(DATE_FORMAT_STRING), icon: 'event'};
                case 'dateTime':
                    return {value: toMoment(immediate.value as NaeDate).format(DATE_TIME_FORMAT_STRING), icon: 'event'};
                case 'enumeration':
                    return {value: immediate.value.defaultValue, icon: undefined};
                case 'multichoice':
                    return {value: immediate.value.map(it => it.defaultValue).join(', '), icon: undefined};
                case 'file':
                    return {value: immediate.value, icon: 'insert_drive_file'};
                case 'user':
                    return {value: immediate.value.fullName, icon: 'account_circle'};
                case 'boolean':
                    return {value: this._translate.instant('dataField.values.boolean.' + immediate.value), icon: undefined};
                default:
                    return {value: immediate.value, icon: undefined};
            }
        } else {
            return {value: '', icon: ''};
        }
    }
}
