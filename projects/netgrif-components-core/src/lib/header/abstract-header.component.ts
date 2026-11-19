import {Component, Inject, Injector, Input, OnDestroy, OnInit, Optional, ChangeDetectionStrategy} from '@angular/core';
import {AbstractHeaderService} from './abstract-header-service';
import {CaseHeaderService} from './case-header/case-header.service';
import {TaskHeaderService} from './task-header/task-header.service';
import {WorkflowHeaderService} from './workflow-header/workflow-header.service';
import {HeaderType} from './models/header-type';
import {HeaderMode} from './models/header-mode';
import {HeaderSearchService} from '../search/header-search-service/header-search.service';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {OverflowService} from './services/overflow.service';
import {stopPropagation} from '../utility/stop-propagation';
import {Subscription} from 'rxjs';
import {debounceTime} from "rxjs/operators";
import {CaseViewService} from "../view/case-view/service/case-view-service";
import {
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData
} from "../data-fields/models/data-field-portal-data-injection-token";
import {MultichoiceField} from "../data-fields/multichoice-field/models/multichoice-field";
import {EnumerationField} from "../data-fields/enumeration-field/models/enumeration-field";

@Component({
    selector: 'ncc-abstract-header',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractHeaderComponent implements OnInit, OnDestroy {

    protected readonly DEFAULT_COLUMN_COUNT = 6;
    /** @deprecated see {@link columnWidthControl} */
    protected readonly DEFAULT_COLUMN_WIDTH = 220;
    protected readonly INPUT_DEBOUNCE_TIME = 600;
    @Input() type: HeaderType = HeaderType.CASE;
    @Input() hideHeaderMenu = false;
    @Input() showEditButton = true;
    @Input() showSortButton = true;
    @Input() showSearchButton = true;
    @Input() showTableSection = true;
    @Input() public approval: boolean;

    public headerService: AbstractHeaderService;
    protected _headerSearch: HeaderSearchService;
    public readonly headerModeEnum = HeaderMode;
    public readonly headerTypeEnum = HeaderType;
    public overflowControl: FormControl<boolean>;
    public columnCountControl: FormControl<number>;
    /**
     * @deprecated the columns of the table mode share the width of the view (at least
     * {@link OverflowService.MIN_COLUMN_WIDTH}), there is no column width setting; kept for the applications (its value
     * is stored in {@link OverflowService.columnWidth}, unused by the library), will be removed in a future major version
     */
    public columnWidthControl: FormControl<number>;
    public canOverflow: boolean;
    public subOverflowControl: Subscription;
    public subColumnCountControl: Subscription;
    /** @deprecated see {@link columnWidthControl} */
    public subColumnWidthControl: Subscription;

    protected _initHeaderCount: number = undefined;
    protected _initResponsiveHeaders: boolean = undefined;
    protected _approvalFormControl: FormControl<boolean>;
    protected _changeValue: boolean;
    protected _subCases: Subscription;

    constructor(protected _injector: Injector,
                protected _translate: TranslateService,
                @Optional() protected _overflowService: OverflowService,
                @Optional() protected _caseViewService: CaseViewService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) protected _dataFieldPortalData: DataFieldPortalData<MultichoiceField | EnumerationField>) {
        this.initializeFormControls(this._overflowService !== null);
        this._changeValue = true;
    }

    @Input()
    public set maxHeaderColumns(count: number) {
        if (this.headerService) {
            this.headerService.headerColumnCount = count;
        } else {
            this._initHeaderCount = count;
        }
        if (this._overflowService === null || (this._overflowService !== null && !this._overflowService.initializedCount)) {
            this.columnCountControl.setValue(count);
        }
    }

    @Input()
    public set responsiveHeaders(responsive: boolean) {
        if (this.headerService) {
            this.headerService.responsiveHeaders = responsive;
        } else {
            this._initResponsiveHeaders = responsive;
        }
    }

    get approvalFormControl(): FormControl<boolean> {
        return this._approvalFormControl;
    }

    public changeHeadersMode(mode: HeaderMode, saveLastMode: boolean = true) {
        if (this.headerService) {
            this.headerService.changeMode(mode, saveLastMode)
        }
    }

    ngOnInit(): void {
        this.resolveHeaderService();
        this.initializedHeaderSearch();
        if (this._initHeaderCount !== undefined) {
            this.headerService.headerColumnCount = this._initHeaderCount;
        }
        if (this._initResponsiveHeaders !== undefined) {
            this.headerService.responsiveHeaders = this._initResponsiveHeaders;
        }
        this.headerService.preferenceColumnCount$.subscribe(value => this.columnCountControl.setValue(value));
        this.resolveApprovalDatafields();
    }

    ngOnDestroy(): void {
        if (this.canOverflow) {
            this.subColumnWidthControl?.unsubscribe();
            this.subColumnCountControl.unsubscribe();
            this.subOverflowControl.unsubscribe();
        }
        if (this._subCases) {
            this._subCases.unsubscribe();
        }
    }

    /**
     * Injects the correct {@link AbstractHeaderService} instance based on this component's type
     */
    protected resolveHeaderService() {
        switch (this.type) {
            case HeaderType.CASE:
                this.headerService = this._injector.get(CaseHeaderService);
                break;
            case HeaderType.TASK:
                this.headerService = this._injector.get(TaskHeaderService);
                break;
            case HeaderType.WORKFLOW:
                this.headerService = this._injector.get(WorkflowHeaderService);
                break;
        }
    }

    /**
     * Sets the correct {@link AbstractHeaderService} instance to the {@link HeaderSearchService}
     */
    protected initializedHeaderSearch() {
        if (this.type === HeaderType.CASE) {
            this._headerSearch = this._injector.get(HeaderSearchService);
            this._headerSearch.headerService = this.headerService;
        }
    }

    clickStop($event) {
        stopPropagation($event);
    }

    /** minimal width of a column: in table mode the columns stretch over the view, at least to this width */
    getMinWidth() {
        return (this._overflowService && this._overflowService.overflowMode) ? `${OverflowService.MIN_COLUMN_WIDTH}px` : '0';
    }

    confirmEditMode() {
        if (!this.overflowControl.value || (this.overflowControl.value && this.columnCountControl.valid)) {
            this.headerService.confirmEditMode();
        }
    }

    /** @deprecated see {@link columnWidthControl} */
    getErrorMessageWidth() {
        return this.buildErrorMessage(this.columnWidthControl, OverflowService.MIN_COLUMN_WIDTH);
    }

    getErrorMessageCount() {
        return this.buildErrorMessage(this.columnCountControl, 1);
    }

    buildErrorMessage(formControlRef: FormControl<any>, minNumber) {
        if (formControlRef.hasError('required')) {
            return this._translate.instant('dataField.validations.required');
        }
        if (formControlRef.hasError('min')) {
            return this._translate.instant('dataField.validations.min', {length: minNumber});
        }
        return '';
    }

    protected initializeFormControls(exist: boolean) {
        this.canOverflow = exist;
        this.overflowControl = new FormControl(exist ? this._overflowService.overflowMode : false);
        this.columnCountControl = new FormControl(exist ? this._overflowService.columnCount : this.DEFAULT_COLUMN_COUNT, [
            Validators.required,
            Validators.min(1)]);
        this.columnWidthControl = new FormControl(exist ? this._overflowService.columnWidth : this.DEFAULT_COLUMN_WIDTH, [
            Validators.required,
            Validators.min(OverflowService.MIN_COLUMN_WIDTH)]);
        this._approvalFormControl = new FormControl(false);
        if (exist) {
            this.initializeValueChanges();
        }
    }

    protected initializeValueChanges() {
        this.subOverflowControl = this.overflowControl.valueChanges.subscribe(value => {
            this._overflowService.overflowMode = value;
        });
        this.subColumnCountControl = this.columnCountControl.valueChanges.pipe(debounceTime(this.INPUT_DEBOUNCE_TIME)).subscribe(value => {
            if (this.columnCountControl.valid) {
                this._overflowService.columnCount = value;
                if (this.headerService && this.type === HeaderType.CASE) {
                    this.headerService.headerColumnCount = value;
                    (this.headerService as CaseHeaderService).updateColumnCount();
                }
            }
        });
        this.subColumnWidthControl = this.columnWidthControl.valueChanges.pipe(debounceTime(this.INPUT_DEBOUNCE_TIME)).subscribe(value => {
            if (this.columnWidthControl.valid) {
                this._overflowService.columnWidth = value;
            }
        });
    }

    public indeterminate() {
        if (this._caseViewService) {
            return this._dataFieldPortalData?.dataField?.value?.length > 0 &&
                this._caseViewService.cases.some(value => this._dataFieldPortalData?.dataField.value.includes(value.stringId)) &&
                !this.resolveApprovalValue();
        }
        return this._dataFieldPortalData?.dataField?.value?.length > 0 &&
            this._dataFieldPortalData?.dataField?.value?.length < this._dataFieldPortalData?.dataField?.choices?.length;
    }

    public typeApproval() {
        return this._dataFieldPortalData?.dataField instanceof MultichoiceField ? 'multichoice' : 'enumeration';
    }

    protected resolveApprovalDatafields() {
        if (this._dataFieldPortalData !== null && this._dataFieldPortalData.dataField instanceof MultichoiceField && this._caseViewService) {
            this.approvalFormControl.setValue(this.resolveApprovalValue());
            this.approvalFormControl.valueChanges.subscribe(value => {
                if (this._changeValue) {
                    if (value) {
                        this._dataFieldPortalData.dataField.value = this._caseViewService.cases.map(caze => caze.stringId);
                    } else {
                        this._dataFieldPortalData.dataField.value = [];
                    }
                }
                this._changeValue = true;
            })
            this._dataFieldPortalData.dataField.valueChanges().subscribe(() => {
                this._changeValue = false;
                this.approvalFormControl.setValue(this.resolveApprovalValue());
            })
            this._subCases = this._caseViewService.cases$.subscribe(() => {
                this._changeValue = false;
                this.approvalFormControl.setValue(this.resolveApprovalValue());
            })
        }
        if (this._dataFieldPortalData !== null && this._dataFieldPortalData.dataField instanceof EnumerationField) {
            this.approvalFormControl.valueChanges.subscribe(value => {
                this._dataFieldPortalData.dataField.value = null;
            })
        }
    }

    protected resolveApprovalValue() {
        if (this._caseViewService.cases.length === 0) {
            return false;
        }
        return this._caseViewService.cases.every(value => this._dataFieldPortalData?.dataField.value.includes(value.stringId));
    }
}
