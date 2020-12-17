import {Input} from '@angular/core';
import {Observable} from 'rxjs';
import {Case} from '../../resources/interface/case';
import {NaeDate, toMoment} from '../../resources/types/nae-date-type';
import {HeaderColumn} from '../../header/models/header-column';
import {DATE_FORMAT_STRING, DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {PanelWithHeaderBinding} from '../abstract/panel-with-header-binding';
import {CaseMetaField} from '../../header/case-header/case-menta-enum';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {CaseViewService} from '../../view/case-view/service/case-view-service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../logger/services/logger.service';
import {OverflowService} from '../../header/services/overflow.service';
import {PanelWithImmediateData} from '../abstract/panel-with-immediate-data';


export abstract class AbstractCasePanelComponent extends PanelWithImmediateData {

    @Input() public case_: Case;
    @Input() public selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() responsiveBody = true;
    @Input() first: boolean;
    @Input() last: boolean;
    @Input() showCasePanelIcon = true;
    @Input() showDeleteMenu = false;
    @Input() textEllipsis = false;

    protected constructor(protected _caseResourceService: CaseResourceService, protected _caseViewService: CaseViewService,
                          protected _snackBarService: SnackBarService, protected _translateService: TranslateService,
                          protected _log: LoggerService, protected _overflowService: OverflowService) {
        super(_translateService);
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
                    value: toMoment(this.case_.creationDate).format(DATE_TIME_FORMAT_STRING),
                    icon: 'event'
                };
        }
    }

    protected getFeaturedImmediateValue(selectedHeader: HeaderColumn) {
        const immediate = this.case_.immediateData.find(it => it.stringId === selectedHeader.fieldIdentifier);
        return this.parseImmediateValue(immediate);
    }

    public deleteCase() {
        this._caseResourceService.deleteCase(this.case_.stringId).subscribe(data => {
            if (data.success) {
                this._caseViewService.reload();
            } else if (data.error) {
                this.throwError(this._translateService.instant('tasks.snackbar.caseDeleteFailed'));
            }
        }, error => {
            this.throwError(this._translateService.instant('tasks.snackbar.caseDeleteFailed'));
        });
    }

    private throwError(message: string) {
        this._snackBarService.openErrorSnackBar(message);
        this._log.error(message);
    }

    public getMinWidth() {
        return (this._overflowService && this._overflowService.overflowMode) ? `${this._overflowService.columnWidth}px` : '0';
    }
}
