import {Component} from '@angular/core';
import {CaseResourceService, Filter, FilterType, ProcessService, SimpleFilter, TreeCaseViewService} from '@netgrif/application-engine';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'nae-app-tree-view-example',
    templateUrl: './tree-view-example.component.html',
    styleUrls: ['./tree-view-example.component.scss'],
    providers: [TreeCaseViewService]
})
export class TreeViewExampleComponent {

    public filter: Filter;
    public loading: boolean;

    constructor(private _caseResource: CaseResourceService,
                private _processService: ProcessService) {
        this.loading = true;
        let params: HttpParams = new HttpParams();
        params = params.set('sort', 'creationDateSortable,asc');
        this._caseResource.searchCases(
            new SimpleFilter('', FilterType.CASE, {petriNet: {identifier: 'tree_test'}, query: '(title:root)'}), params)
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
                                query: 'stringId:' + newCase.stringId
                            });
                            this.loading = false;
                        });
                    });
                }
            });
    }

}
