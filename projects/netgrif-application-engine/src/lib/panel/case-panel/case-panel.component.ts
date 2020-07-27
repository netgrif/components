import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {Case} from '../../resources/interface/case';
import {NaeDate, toMoment} from '../../resources/types/nae-date-type';
import {HeaderColumn} from '../../header/models/header-column';
import {DATE_FORMAT_STRING, DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {PanelWithHeaderBinding} from '../abstract/panel-with-header-binding';
import {CaseMetaField} from '../../header/case-header/case-menta-enum';


@Component({
    selector: 'nae-case-panel',
    templateUrl: './case-panel.component.html',
    styleUrls: ['./case-panel.component.scss']
})
export class CasePanelComponent extends PanelWithHeaderBinding {

    @Input() public case_: Case;
    @Input() public selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() responsiveBody = true;
    @Input() first: boolean;
    @Input() last: boolean;

    constructor() {
        super();
    }

    public show(event: MouseEvent): boolean {
        event.stopPropagation();
        return false;
    }

    protected getFeaturedMetaValue(selectedHeader: HeaderColumn) {
        switch (selectedHeader.fieldIdentifier) {
            case CaseMetaField.VISUAL_ID:
                return {value: this.case_.visualId, icon: undefined};
            case CaseMetaField.TITLE:
                return {value: this.case_.title, icon: undefined};
            case CaseMetaField.AUTHOR:
                return {value: this.case_.author.fullName, icon: 'account_circle'};
            case CaseMetaField.CREATION_DATE:
                return {
                    value: toMoment(this.case_.creationDate as NaeDate).format(DATE_TIME_FORMAT_STRING),
                    icon: 'event'
                };
        }
    }

    protected getFeaturedImmediateValue(selectedHeader: HeaderColumn) {
        const immediate = this.case_.immediateData.find(it => it.stringId === selectedHeader.fieldIdentifier);
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
                    return {value: immediate.value, icon: 'account_circle'};
                default:
                    // TODO 8.4.2020 - File field value rendering once file field works
                    // TODO 8.4.2020 - User field value rendering once user field works
                    return {value: immediate.value, icon: undefined};
            }
        } else {
            return {value: '', icon: ''};
        }
    }

}
