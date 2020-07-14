import {Component, Injector, Input, OnInit} from '@angular/core';
import {AbstractHeaderService} from './abstract-header-service';
import {CaseHeaderService} from './case-header/case-header.service';
import {TaskHeaderService} from './task-header/task-header.service';
import {WorkflowHeaderService} from './workflow-header/workflow-header.service';
import {HeaderType} from './models/header-type';
import {HeaderMode} from './models/header-mode';
import {HeaderSearchService} from '../search/header-search-service/header-search.service';
import {CategoryFactory} from '../search/category-factory/category-factory';


@Component({
    selector: 'nae-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [
        CaseHeaderService,
        TaskHeaderService,
        WorkflowHeaderService,
        HeaderSearchService,
        CategoryFactory
    ]
})
export class HeaderComponent implements OnInit {

    @Input() type: HeaderType = HeaderType.CASE;
    @Input() hideEditMode = false;
    @Input() maxHeaderColumns = 5;
    @Input() responsiveHeaders = true;
    public headerService: AbstractHeaderService;
    public readonly headerModeEnum = HeaderMode;
    public readonly headerTypeEnum = HeaderType;

    constructor(private _injector: Injector, private _headerSearch: HeaderSearchService) {
    }

    ngOnInit(): void {
        this.resolveHeaderService();
        this.initializedHeaderSearch();
        this.headerService.maxHeaderColumns = this.maxHeaderColumns;
        this.headerService.responsiveHeaders = this.responsiveHeaders;
    }

    /**
     * Injects the correct {@link AbstractHeaderService} instance based on this component's type
     */
    private resolveHeaderService() {
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
    private initializedHeaderSearch() {
        this._headerSearch.headerService = this.headerService;
    }

}
