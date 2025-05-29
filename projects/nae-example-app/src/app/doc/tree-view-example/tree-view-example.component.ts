import {Component} from '@angular/core';
import {
    CaseResourceService,
    ChangedFieldsService,
    CreateCaseEventOutcome,
    createSortParam,
    Filter,
    FilterType,
    NAE_TREE_CASE_VIEW_CONFIGURATION,
    PaginationParams,
    PaginationSort,
    ProcessService,
    SimpleFilter,
    TreeCaseViewService,
} from '@netgrif/components-core';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'nae-app-tree-view-example',
    templateUrl: './tree-view-example.component.html',
    styleUrls: ['./tree-view-example.component.scss'],
    providers: [
        ChangedFieldsService,
        TreeCaseViewService,
        {provide: NAE_TREE_CASE_VIEW_CONFIGURATION, useValue: {pageSize: 100}}
    ],
    standalone: false
})
export class TreeViewExampleComponent {

    public filter: Filter;
    public loading: boolean;

    private _rootLoading = true;
    private _rootAddingChild = true;

    constructor(private _caseResource: CaseResourceService,
                private _processService: ProcessService) {
        this.loading = true;
        let params: HttpParams = new HttpParams();
        params = params.set(PaginationParams.PAGE_SORT, createSortParam('creationDateSortable', PaginationSort.ASCENDING));
        this._caseResource.searchCases(
            new SimpleFilter('', FilterType.CASE, {process: {identifier: 'tree_test'}, query: '(title:root)'}), params)
            .subscribe(page => {
                if (page && page.content && Array.isArray(page.content) && page.content.length > 0) {
                    this.filter = new SimpleFilter('id', FilterType.CASE, {
                        query: 'stringId:' + page.content[0].stringId
                    });
                    this.loading = false;
                } else {
                    this._processService.getNet('tree_test').subscribe(net => {
                        const newCaseRequest = {
                            title: 'root',
                            color: 'panel-primary-icon',
                            netId: net.stringId
                        };
                        this._caseResource.createCase(newCaseRequest).subscribe(newCase => {
                            this.filter = new SimpleFilter('id', FilterType.CASE, {
                                query: 'stringId:' + (newCase.outcome as CreateCaseEventOutcome).case.stringId
                            });
                            this.loading = false;
                        });
                    });
                }
            });
    }

    rootLoading(state: boolean): void {
        this._rootLoading = state;
    }

    rootAddingChild(state: boolean): void {
        this._rootAddingChild = state;
    }

    showButton(): boolean {
        return !(this._rootLoading || this._rootAddingChild);
    }
}
