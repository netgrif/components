import {Component, Injector, Input, OnDestroy, OnInit, Optional} from '@angular/core';
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

@Component({
    selector: 'ncc-abstract-header',
    template: ''
})
export abstract class AbstractHeaderComponent implements OnInit, OnDestroy {

    protected readonly DEFAULT_COLUMN_COUNT = 6;
    protected readonly DEFAULT_COLUMN_WIDTH = 220;
    protected readonly INPUT_DEBOUNCE_TIME = 600;
    @Input() type: HeaderType = HeaderType.CASE;
    @Input() hideEditMode = false;
    public headerService: AbstractHeaderService;
    protected _headerSearch: HeaderSearchService;
    public readonly headerModeEnum = HeaderMode;
    public readonly headerTypeEnum = HeaderType;
    public overflowControl: FormControl;
    public columnCountControl: FormControl;
    public columnWidthControl: FormControl;
    public canOverflow: boolean;
    public subOverflowControl: Subscription;
    public subColumnCountControl: Subscription;
    public subColumnWidthControl: Subscription;

    protected _initHeaderCount: number = undefined;
    protected _initResponsiveHeaders: boolean = undefined;

    constructor(protected _injector: Injector,
                protected _translate: TranslateService,
                @Optional() protected _overflowService: OverflowService) {
        (this._overflowService !== null) ?
            this.initializeFormControls(true) :
            this.initializeFormControls(false);
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
    }

    ngOnDestroy(): void {
        if (this.canOverflow) {
            this.subColumnWidthControl.unsubscribe();
            this.subColumnCountControl.unsubscribe();
            this.subOverflowControl.unsubscribe();
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

    getMinWidth() {
        return (this._overflowService && this._overflowService.overflowMode) ? `${this._overflowService.columnWidth}px` : '0';
    }

    confirmEditMode() {
        if (!this.overflowControl.value || (this.overflowControl.value && this.columnWidthControl.valid && this.columnWidthControl.valid)) {
            this.headerService.confirmEditMode();
        }
    }

    getErrorMessageWidth() {
        return this.buildErrorMessage(this.columnWidthControl, 180);
    }

    getErrorMessageCount() {
        return this.buildErrorMessage(this.columnCountControl, 1);
    }

    buildErrorMessage(formControlRef: FormControl, minNumber) {
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
            Validators.min(180)]);

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
                if (this.headerService && this.type === HeaderType.CASE) {
                    (this.headerService as CaseHeaderService).updateColumnCount();
                }
            }
        });
    }
}
