import {Component, Inject, OnInit, Optional} from '@angular/core';
import {
    AbstractCasePanelComponent,
    CaseViewService, DATA_FIELD_PORTAL_DATA, DataFieldPortalData, EnumerationField,
    LoggerService, MultichoiceField,
    OverflowService,
    UserService
} from '@netgrif/components-core';
import {CaseResourceService, PermissionService} from '@netgrif/components-core';
import {SnackBarService} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyPipe} from '@angular/common';

@Component({
    selector: 'nc-case-panel',
    templateUrl: './case-panel.component.html',
    styleUrls: ['./case-panel.component.scss']
})
export class CasePanelComponent extends AbstractCasePanelComponent implements OnInit {
    protected _changeValue: boolean;

    constructor(protected _caseResourceService: CaseResourceService,
                protected _caseViewService: CaseViewService,
                protected _snackBarService: SnackBarService,
                protected _translateService: TranslateService,
                protected _log: LoggerService,
                protected _userService: UserService,
                protected _currencyPipe: CurrencyPipe,
                public _permissionService: PermissionService,
                @Optional() protected _overflowService: OverflowService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) protected _dataFieldPortalData: DataFieldPortalData<MultichoiceField | EnumerationField>) {
        super(_caseResourceService, _caseViewService, _snackBarService,
            _translateService, _log, _userService, _currencyPipe, _permissionService, _overflowService);
        this._changeValue = true;
    }

    public typeApproval() {
        return this._dataFieldPortalData?.dataField instanceof MultichoiceField ? 'multichoice' : 'enumeration';
    }

    public caseValue() {
       return this.case_.stringId;
    }

    ngOnInit() {
        super.ngOnInit();
        if (this._dataFieldPortalData !== null && this._dataFieldPortalData.dataField instanceof MultichoiceField) {
            this.approvalFormControl.setValue(this._dataFieldPortalData.dataField.value?.includes(this.case_.stringId));
            this.approvalFormControl.valueChanges.subscribe(value => {
                if (this._changeValue) {
                    if (value) {
                        (this._dataFieldPortalData.dataField as MultichoiceField).value = [...this._dataFieldPortalData.dataField.value, this.case_.stringId];
                    } else {
                        const index = this._dataFieldPortalData.dataField.value.indexOf(this.case_.stringId);
                        if (index >= 0 ) {
                            const arr = [...this._dataFieldPortalData.dataField.value];
                            arr.splice(index, 1);
                            (this._dataFieldPortalData.dataField as MultichoiceField).value = arr;
                        }
                    }
                }
                this._changeValue = true;
            })
            this._dataFieldPortalData.dataField.valueChanges().subscribe(() => {
                this._changeValue = false;
                this.approvalFormControl.setValue(this._dataFieldPortalData.dataField.value?.includes(this.case_.stringId));
            })
        }
        if (this._dataFieldPortalData !== null && this._dataFieldPortalData.dataField instanceof EnumerationField) {
            this.approvalFormControl.setValue(this._dataFieldPortalData.dataField.value);
            this.approvalFormControl.valueChanges.subscribe(value => {
                if (this._changeValue) {
                    (this._dataFieldPortalData.dataField as EnumerationField).value = this.case_.stringId;
                }
               this._changeValue = true;
            })
            this._dataFieldPortalData.dataField.valueChanges().subscribe(() => {
                this._changeValue = false;
                this.approvalFormControl.setValue(this._dataFieldPortalData.dataField.value);
            })
        }
    }
}
