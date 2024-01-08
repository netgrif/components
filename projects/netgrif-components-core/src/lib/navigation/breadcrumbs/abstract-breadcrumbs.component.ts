import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {UriService} from '../service/uri.service';
import {CaseResourceService} from "../../resources/engine-endpoint/case-resource.service";
import {CaseSearchRequestBody} from "../../filter/models/case-search-request-body";
import {HttpParams} from "@angular/common/http";
import {PaginationParams} from "../../utility/pagination/pagination-params";
import {SimpleFilter} from "../../filter/models/simple-filter";
import {take} from "rxjs/operators";
import {BehaviorSubject, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {
    DynamicNavigationRouteProviderService
} from "../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service";
import {Case} from "../../resources/interface/case";
import {I18nFieldValue} from "../../data-fields/i18n-field/models/i18n-field-value";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'ncc-breadcrumbs-component',
    template: ''
})
export abstract class AbstractBreadcrumbsComponent implements OnDestroy, AfterViewInit {

    @Input() showHome: boolean = true;
    @Input() showLast: boolean = true;
    @Input() redirectOnClick: boolean = true;
    @Input() lengthOfPath: number = 30;
    @Input() partsAfterDots: number = 2;
    breadcrumbsParts: Array<string>;
    private static DOTS: string = '...';
    private static DELIMETER: string = '/';
    private static NODE_PATH: string = 'nodePath';
    private static ITEM_SETTINGS: string = 'item_settings';
    private _showPaths: boolean = false;
    private nicePath: BehaviorSubject<Array<string>>;
    private redirectUrls: Map<string, Array<string>>;
    private nicePathSubscription: Subscription;

    protected constructor(protected _uriService: UriService,
                          protected _caseResourceService: CaseResourceService,
                          protected _activatedRoute: ActivatedRoute,
                          protected _router: Router,
                          protected _dynamicRoutingService: DynamicNavigationRouteProviderService,
                          protected _translateService: TranslateService) {
        this.nicePath = new BehaviorSubject<Array<string>>(undefined);
        this.redirectUrls = new Map<string, Array<string>>();
        this.initNicePath();
    }

    ngAfterViewInit() {
        this.initFilterCase();
    }

    ngOnDestroy(): void {
        if (!!this.nicePathSubscription) {
            this.nicePathSubscription.unsubscribe();
        }
    }

    public initFilterCase() {
        const filterId = this._activatedRoute.snapshot.params.filterCaseId
        if (!!filterId) {
            const splitPath = this._uriService.splitNodePath(this._uriService.activeNode);
            const fullPath = this.createFullPath(splitPath);
            const fullPathQueries = fullPath.map(p => '(processIdentifier:preference_item AND dataSet.nodePath.textValue.keyword:\"' + p + '\")')
            fullPathQueries.push('(taskMongoIds:\"' + filterId + '\")')

            const searchBody: CaseSearchRequestBody = {
                query: fullPathQueries.join(" OR ")
            };
            let httpParams = new HttpParams()
                .set(PaginationParams.PAGE_SIZE, 25)
                .set(PaginationParams.PAGE_NUMBER, 0);

            this._caseResourceService.searchCases(SimpleFilter.fromCaseQuery(searchBody), httpParams).pipe(take(1)).subscribe(result => {
                const cases = result.content;
                const filterCase = cases.find(c => c.tasks.some(t => t.task === filterId));
                fullPath.push(this.immediateValue(filterCase, AbstractBreadcrumbsComponent.NODE_PATH));
                cases.sort((a, b) => fullPath.indexOf(this.immediateValue(a, AbstractBreadcrumbsComponent.NODE_PATH)) - fullPath.indexOf(this.immediateValue(b, AbstractBreadcrumbsComponent.NODE_PATH)));
                cases.forEach(c => this.redirectUrls.set(this.immediateValue(c, AbstractBreadcrumbsComponent.NODE_PATH), [this._dynamicRoutingService.route, c.tasks.find(t => t.transition === AbstractBreadcrumbsComponent.ITEM_SETTINGS).task]))
                this.nicePath.next(cases.map(c => this.getTranslation(this.immediateValue(c, 'menu_name'))));
            });
        }
    }

    public initNicePath() {
        this.nicePathSubscription = this.nicePath.subscribe(np => {
            if (!!np) {
                np = np.filter(s => s !== UriService.ROOT);
                if (np?.length > this.partsAfterDots + 1 && this._uriService.activeNode?.uriPath.length > this.lengthOfPath && !this._showPaths) {
                    const newPath = [np[0], AbstractBreadcrumbsComponent.DOTS];
                    for (let i = np.length - this.partsAfterDots; i < np.length; i++) {
                        newPath.push(np[i]);
                    }
                    this.breadcrumbsParts = newPath;
                    return;
                }
                this.breadcrumbsParts = np;
            }
        });
    }

    public redirect() {
        if (!this.redirectOnClick) {
            return;
        }
        this._router.navigate(this.redirectUrls.get(this._uriService.activeNode.uriPath)).then(r => {})
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
            this.showLast = false;
            this.nicePath.next(this.nicePath.value.slice(0, control + 1))
            this.redirect();
        })
    }

    private resultCounter(count: number, tmp: string[]): number {
        if (tmp?.length > this.partsAfterDots + 1 && this._uriService.activeNode?.uriPath.length > this.lengthOfPath && !this._showPaths) {
            return tmp.length - this.partsAfterDots + (count - 2);
        }
        return count;
    }

    private createFullPath(splitPath: Array<string>): Array<string> {
        let tmp = '';
        return splitPath.filter(s => s !== "").map((value) => {
            tmp += AbstractBreadcrumbsComponent.DELIMETER + value;
            return tmp.replace("//", AbstractBreadcrumbsComponent.DELIMETER)
        });
    }

    private immediateValue(aCase: Case, fieldId: string): any {
        return aCase.immediateData.find(s => s.stringId === fieldId)?.value
    }

    private getTranslation(value: I18nFieldValue): string {
        const locale = this._translateService.currentLang.split('-')[0];
        return locale in value.translations ? value.translations[locale] : value.defaultValue;
    }
}
