import {Input} from '@angular/core';
import {Observable} from 'rxjs';
import {Case} from '../../resources/interface/case';
import {toMoment} from '../../resources/types/nae-date-type';
import {HeaderColumn} from '../../header/models/header-column';
import {DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {CaseMetaField} from '../../header/case-header/case-menta-enum';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {CaseViewService} from '../../view/case-view/service/case-view-service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../logger/services/logger.service';
import {OverflowService} from '../../header/services/overflow.service';
import {PanelWithImmediateData} from '../abstract/panel-with-immediate-data';
import {UserService} from '../../user/services/user.service';
import {take} from 'rxjs/operators';
import {getImmediateData} from '../../utility/get-immediate-data';
import {FeaturedValue} from '../abstract/featured-value';
import {CurrencyPipe} from '@angular/common';
import {FieldTypeResource} from '../../task-content/model/field-type-resource';
import {PermissionType} from '../../process/permissions';


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
                          protected _log: LoggerService, protected _overflowService: OverflowService, protected _userService: UserService,
                          protected _currencyPipe: CurrencyPipe) {
        super(_translateService, _currencyPipe);
    }

    public show(event: MouseEvent): boolean {
        event.stopPropagation();
        return false;
    }

    protected getFeaturedMetaValue(selectedHeader: HeaderColumn): FeaturedValue {
        switch (selectedHeader.fieldIdentifier) {
            case CaseMetaField.MONGO_ID:
                return {value: this.case_.stringId, type: 'meta'};
            case CaseMetaField.VISUAL_ID:
                return {value: this.case_.visualId, type: 'meta'};
            case CaseMetaField.TITLE:
                return {value: this.case_.title, type: 'meta'};
            case CaseMetaField.AUTHOR:
                return {value: this.case_.author.fullName, icon: 'account_circle', type: 'meta'};
            case CaseMetaField.CREATION_DATE:
                return {
                    value: toMoment(this.case_.creationDate).format(DATE_TIME_FORMAT_STRING),
                    icon: 'event',
                    type: 'meta'
                };
            default:
                throw new Error(`Featured meta value resolution for type '${selectedHeader.fieldIdentifier}' is not implemented!`);
        }
    }

    protected getFeaturedImmediateValue(selectedHeader: HeaderColumn): FeaturedValue {
        const immediate = getImmediateData(this.case_, selectedHeader.fieldIdentifier);

        if (immediate === undefined) {
            this._log.debug(`Featured immediate field value for field with id '${selectedHeader.fieldIdentifier}' on case with id '${
                this.case_.stringId}' cannot be resolved because the field is not present in the case`);
            return {value: '', type: FieldTypeResource.TEXT};
        }

        return this.parseImmediateValue(immediate);
    }

    public deleteCase() {
        this._caseResourceService.deleteCase(this.case_.stringId).pipe(take(1)).subscribe(data => {
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

    public canDo(action: PermissionType): boolean {
        if (!this.case_
            || !this.case_.permissions
            || !action
            || !(this.case_.permissions instanceof Object)
        ) {
            return false;
        }
        if (Object.keys(this.case_.permissions).length === 0 && Object.keys(this.case_?.users ?? {}).length === 0) {
            return true;
        }

        let result = true;

        const userPermissions = this.case_.users;
        if (userPermissions === undefined) {
            this._log.debug(`Case with ID '${this.case_.stringId}' contains no user permissions. Skipping permission check...`);
            return result;
        }

        if (Object.keys(userPermissions).length > 0
            && !!userPermissions[this._userService.user.id]
            && userPermissions[this._userService.user.id][action] !== undefined) {
            result = userPermissions[this._userService.user.id][action];
        }
        this._userService.user.roles.forEach(role => {
            if (!!this.case_.permissions[role.stringId]
                && this.case_.permissions[role.stringId][action] !== undefined) {
                result = result && !!this.case_.permissions[role.stringId][action];
            }
        });
        return result;
    }
}
