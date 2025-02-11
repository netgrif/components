import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
    AllowedNetsService,
    Case,
    CaseResourceService,
    CaseSearchRequestBody,
    CreateCaseRequestBody,
    GroupNavigationConstants,
    LoadingEmitter,
    MENU_IDENTIFIERS,
    Net,
    Page,
    PaginationParams,
    PermissionService,
    PermissionType,
    PetriNetResourceService,
    PetriNetSearchRequest,
    SimpleFilter,
    SnackBarService,
    UriService
} from '@netgrif/components-core';
import {Observable, of, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {
    CaseEventOutcome
} from '@netgrif/components-core/lib/event/model/event-outcomes/case-outcomes/case-event-outcome';
import {HttpParams} from '@angular/common/http';
import {I18nFieldValue} from '@netgrif/components-core/lib/data-fields/i18n-field/models/i18n-field-value';
import {TranslateService} from "@ngx-translate/core";

export interface TicketItem {
    id: string;
    petriNetId: string;
    title: string;
    icon: string;
    customViewSelector: string;
    resource?: Case;
}

@Component({
    selector: 'nc-default-ticket-view',
    templateUrl: './default-ticket-view.component.html',
    styleUrls: ['./default-ticket-view.component.scss']
})
export class DefaultTicketViewComponent implements OnInit {

    public loading$: LoadingEmitter = new LoadingEmitter();
    public createCaseLoading$: LoadingEmitter = new LoadingEmitter();

    public nets: Net[];
    public dashboardItems: Array<TicketItem>;
    public dashboardItemsForSearch: Array<TicketItem>;

    constructor(private _caseResourceService: CaseResourceService,
                private _allowedNetsService: AllowedNetsService,
                private _permissionService: PermissionService,
                private _snackbar: SnackBarService,
                private _activeRoute: ActivatedRoute,
                private _router: Router,
                private _uriService: UriService,
                protected _translateService: TranslateService,
                protected _petriNetService: PetriNetResourceService) {
    }

    ngOnInit(): void {
        this.loadTicketCreateContent();
    }

    public loadTicketCreateContent() {

        this._uriService.getNodeByPath("/it").subscribe(uri => {
            this._uriService.getChildNodes(uri).subscribe(childNodes => {
                this._uriService.getItemCaseByNodePath(uri).subscribe(page => {
                    let childCases$;
                    if (page.pagination.totalElements === 0) {
                        childCases$ = of([]);
                    } else {
                        let orderedChildCaseIds = this.extractChildCaseIds(page.content[0]);
                        childCases$ = this.getItemCasesByIdsInOnePage(orderedChildCaseIds).pipe(
                            map(p => p.content)
                        );
                    }
                    childCases$.subscribe(result => {
                        result = (result as Case[]);
                        this.dashboardItems = result.map(item => this.resolveItemCaseToNavigationItem(item)).filter(menuItem => menuItem.customViewSelector == "create-ticket-tile");
                        this.dashboardItemsForSearch = result.map(item => this.resolveItemCaseToNavigationItem(item)).filter(menuItem => menuItem.customViewSelector == "create-ticket-tile");
                    })
                });
            })
        })
    }

    // copied from abstract-navigation-double-drawer
    protected resolveItemCaseToNavigationItem(itemCase: Case): TicketItem | undefined {
        // TODO dotiahnut allowed nets do petriNetId
        // this._caseResourceService.getOneCase(itemCase.immediateData.find(f => f.stringId === GroupNavigationConstants.GROUP_NAVIGATION_ROUTER_PARAM)?.value).subscribe(value => {
        //     return value.immediateData.
        // })
        // this._filterExtractionService.extractCompleteFilterFromData()

        return {
            id: itemCase.stringId,
            icon: itemCase.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_MENU_ICON)?.value || "add",
            title: this.getTranslation(itemCase.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_MENU_NAME)?.value) || itemCase.title,
            petriNetId: "ticket",
            customViewSelector: itemCase.immediateData.find(f => f.stringId === "custom_view_selector")?.value,
            resource: itemCase,
        }
    }

    // copied from abstract-navigation-double-drawer
    protected getTranslation(value: I18nFieldValue): string {
        const locale = this._translateService.currentLang.split('-')[0];
        return locale in value.translations ? value.translations[locale] : value.defaultValue;
    }

    // copied from abstract-navigation-double-drawer
    protected getItemCasesByIdsInOnePage(caseIds: string[]): Observable<Page<Case>> {
        return this.getItemCasesByIds(caseIds, 0, caseIds.length);
    }

    // copied from abstract-navigation-double-drawer
    protected getItemCasesByIds(caseIds: string[], pageNumber: number, pageSize: string | number): Observable<Page<Case>> {
        const searchBody: CaseSearchRequestBody = {
            stringId: caseIds,
            process: MENU_IDENTIFIERS.map(id => ({identifier: id} as PetriNetSearchRequest)),
        };

        let httpParams = new HttpParams()
            .set(PaginationParams.PAGE_SIZE, pageSize)
            .set(PaginationParams.PAGE_NUMBER, pageNumber);
        return this._caseResourceService.searchCases(SimpleFilter.fromCaseQuery(searchBody), httpParams);
    }

    // copied from abstract-navigation-double-drawer
    protected extractChildCaseIds(item: Case): string[] {
        return item.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_CHILD_ITEM_IDS)?.value;
    }

    public getAllowedNets(): Observable<Net[]> {
        return this._allowedNetsService.allowedNets$.pipe(
            map(net => net.filter(n => this._permissionService.hasNetPermission(PermissionType.CREATE, n)))
        );
    }

    public createCase(item: TicketItem) {
        if (this.isCardLoading()) {
            return;
        }
        this.createCaseLoading$.on();
        this._petriNetService.getOne(item.petriNetId, "latest").subscribe(petriNet => {
            this._caseResourceService.createCase({
                netId: petriNet.stringId,
                title: item.title
            } as CreateCaseRequestBody).subscribe((caseResult) => {
                this._router.navigate(['case', (caseResult.outcome as CaseEventOutcome).aCase.stringId, this._activeRoute.snapshot.paramMap.get('filterCaseId')])
                this.createCaseLoading$.off();

            }, (error) => {
                this._snackbar.openErrorSnackBar(error);
                this.createCaseLoading$.off();
            });
        })
    }

    public isCardLoading() {
        return this.createCaseLoading$.isActive;
    }

    public searchItems($event: any) {
        if ($event.target.value.length === 0) {
            this.dashboardItemsForSearch = this.dashboardItems;
            return
        }
        this.dashboardItemsForSearch = this.dashboardItems.filter(value => value.title.toLowerCase().includes($event.target.value.toLowerCase()));
    }
}
