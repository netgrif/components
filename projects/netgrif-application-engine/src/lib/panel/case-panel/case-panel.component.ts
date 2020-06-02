import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {Case} from '../../resources/interface/case';
import {NaeDate, toMoment} from '../../resources/types/nae-date-type';
import {HeaderColumn} from '../../header/models/header-column';
import {CaseMetaField} from '../../header/case-header/case-header.service';
import {DATE_FORMAT_STRING, DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {PanelWithHeaderBinding} from '../abstract/panel-with-header-binding';


@Component({
    selector: 'nae-case-panel',
    templateUrl: './case-panel.component.html',
    styleUrls: ['./case-panel.component.scss']
})
export class CasePanelComponent extends PanelWithHeaderBinding {

    @Input() public case_: Case;
    @Input() public selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() first: boolean;
    @Input() last: boolean;

    constructor() {
        super();
    }

    public show(event: MouseEvent): boolean {
        event.stopPropagation();
        return false;
    }

    protected getFeaturedMetaValue(selectedHeader: HeaderColumn): string {
        switch (selectedHeader.fieldIdentifier) {
            case CaseMetaField.VISUAL_ID:
                return this.case_.visualId;
            case CaseMetaField.TITLE:
                return this.case_.title;
            case CaseMetaField.AUTHOR:
                return this.case_.author.fullName;
            case CaseMetaField.CREATION_DATE:
                return toMoment(this.case_.creationDate as NaeDate).format(DATE_TIME_FORMAT_STRING);
        }
    }

    protected getFeaturedImmediateValue(selectedHeader: HeaderColumn): string {
        const immediate = this.case_.immediateData.find(it => it.stringId === selectedHeader.fieldIdentifier);
        if (immediate && immediate.value !== undefined) {
            switch (immediate.type) {
                case 'date':
                    return toMoment(immediate.value as NaeDate).format(DATE_FORMAT_STRING);
                case 'dateTime':
                    return toMoment(immediate.value as NaeDate).format(DATE_TIME_FORMAT_STRING);
                case 'enumeration':
                    return immediate.value.defaultValue;
                case 'multichoice':
                    return immediate.value.map(it => it.defaultValue).join(', ');
                default:
                    // TODO 8.4.2020 - File field value rendering once file field works
                    // TODO 8.4.2020 - User field value rendering once user field works
                    return immediate.value;
            }
        }
    }

}
