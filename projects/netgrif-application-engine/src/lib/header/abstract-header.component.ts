import {Injector, Input, OnInit} from '@angular/core';
import {AbstractHeaderService} from './abstract-header-service';
import {CaseHeaderService} from './case-header/case-header.service';
import {TaskHeaderService} from './task-header/task-header.service';
import {WorkflowHeaderService} from './workflow-header/workflow-header.service';
import {HeaderType} from './models/header-type';
import {HeaderMode} from './models/header-mode';
import {HeaderSearchService} from '../search/header-search-service/header-search.service';

export abstract class AbstractHeaderComponent implements OnInit {

    @Input() type: HeaderType = HeaderType.CASE;
    @Input() hideEditMode = false;
    public headerService: AbstractHeaderService;
    protected _headerSearch: HeaderSearchService;
    public readonly headerModeEnum = HeaderMode;
    public readonly headerTypeEnum = HeaderType;

    protected _initHeaderCount: number = undefined;
    protected _initResponsiveHeaders: boolean = undefined;

    constructor(protected _injector: Injector) {
    }

    @Input()
    public set maxHeaderColumns(count: number) {
        if (this.headerService) {
            this.headerService.headerColumnCount = count;
        } else {
            this._initHeaderCount = count;
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

}
