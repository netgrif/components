import {Component, Input, OnDestroy} from '@angular/core';
import {UriService} from '../service/uri.service';
import {CaseResourceService} from "../../resources/engine-endpoint/case-resource.service";
import {CaseSearchRequestBody} from "../../filter/models/case-search-request-body";
import {HttpParams} from "@angular/common/http";
import {PaginationParams} from "../../utility/pagination/pagination-params";
import {SimpleFilter} from "../../filter/models/simple-filter";
import {take} from "rxjs/operators";
import {BehaviorSubject, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'ncc-breadcrumbs-component',
    template: ''
})
export abstract class AbstractBreadcrumbsComponent implements OnDestroy {

    @Input() showHome: boolean = true;
    @Input() showFilter: boolean = true;
    @Input() lengthOfPath: number = 30;
    @Input() partsAfterDots: number = 2;
    filterName: string;
    paths: Array<string>;
    private static DOTS: string = '...';
    private static DELIMETER: string = '/';
    private _showPaths: boolean = false;
    private nicePath: BehaviorSubject<string>;
    private nicePathSubscription: Subscription;

    protected constructor(protected _uriService: UriService,
                          protected _caseResourceService: CaseResourceService,
                          protected _activatedRoute: ActivatedRoute) {
        this.nicePath = new BehaviorSubject<string>(undefined);
        this.paths = [];
        this.initNicePath();
    }

    ngOnDestroy(): void {
        if (!!this.nicePathSubscription) {
            this.nicePathSubscription.unsubscribe();
        }
    }

    public resolveMenuCase() {
        const searchBody: CaseSearchRequestBody = {
            query: 'processIdentifier:preference_item AND dataSet.nodePath.textValue.keyword:\"' + this._uriService.activeNode.uriPath + '\"'
        };
        let httpParams = new HttpParams()
            .set(PaginationParams.PAGE_SIZE, 2)
            .set(PaginationParams.PAGE_NUMBER, 0);
        this._caseResourceService.searchCases(SimpleFilter.fromCaseQuery(searchBody), httpParams).pipe(take(1)).subscribe(result => {
            this.nicePath.next(result.content[0].immediateData.find(s => s.stringId === 'nicePath').value);
        });
    }

    public resolveFilterCase() {
        const filterId = this._activatedRoute.snapshot.params.filterCaseId
        if (!!filterId) {
            const searchBody: CaseSearchRequestBody = {
                query: 'taskMongoIds:\"' + this._activatedRoute.snapshot.params.filterCaseId + '\"'
            };
            let httpParams = new HttpParams()
                .set(PaginationParams.PAGE_SIZE, 2)
                .set(PaginationParams.PAGE_NUMBER, 0);
            this._caseResourceService.searchCases(SimpleFilter.fromCaseQuery(searchBody), httpParams).pipe(take(1)).subscribe(result => {
                this.filterName = result.content[0].title;
            });
        }
    }

    public initNicePath() {
        this.nicePathSubscription = this.nicePath.subscribe(np => {
            if (!!np) {
                const tmp = this._uriService.splitNodePathString(np);
                if (tmp?.length > this.partsAfterDots + 1 && this._uriService.activeNode?.uriPath.length > this.lengthOfPath && !this._showPaths) {
                    const newPath = [tmp[0], AbstractBreadcrumbsComponent.DOTS];
                    for (let i = tmp.length - this.partsAfterDots; i < tmp.length; i++) {
                        newPath.push(tmp[i]);
                    }
                    this.paths = newPath;
                    return;
                }
                this.paths = tmp === undefined ? [] : tmp;
            }
        })
        this.resolveMenuCase();
        this.resolveFilterCase();
    }

    public reset(): void {
        this._uriService.reset();
    }

    public changePath(path: string, count: number) {
        if (path === AbstractBreadcrumbsComponent.DOTS && count === 1) {
            this._showPaths = true;
            this.nicePath.next(this.nicePath.value);
            return;
        }
        let fullPath: string = '';
        const tmp = this._uriService.splitNodePath(this._uriService.activeNode);
        if (tmp === undefined) return;
        const control = this.resultCounter(count, tmp);
        for (let i = 0; i <= control; i++) {
            fullPath += tmp[i];
            if (i !== control) fullPath += AbstractBreadcrumbsComponent.DELIMETER;
        }
        this._uriService.getNodeByPath(fullPath).subscribe(node => {
            this._uriService.activeNode = node;
            this.showFilter = false;
            this.resolveMenuCase();
        })
    }

    private resultCounter(count: number, tmp: string[]): number {
        if (tmp?.length > this.partsAfterDots + 1 && this._uriService.activeNode?.uriPath.length > this.lengthOfPath && !this._showPaths) {
            return tmp.length - this.partsAfterDots + (count - 2);
        }
        return count;
    }
}
