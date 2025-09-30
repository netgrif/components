import {AfterViewInit, Component, Inject, Optional, ViewChild} from '@angular/core';
import {
    AbstractCaseViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    Case,
    CaseViewService,
    CategoryFactory,
    defaultCaseSearchCategoriesFactory,
    FilterType,
    NAE_CASE_REF_CREATE_CASE,
    NAE_CASE_REF_SEARCH,
    CaseRefField,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    NAE_VIEW_ID_SEGMENT,
    OverflowService,
    SearchMode,
    SearchService,
    SimpleFilter,
    TaskSetDataRequestFields,
    ViewIdService,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    MultichoiceField,
    EnumerationField,
    NAE_DATAFIELD_ALLOWED_NETS,
    NAE_DEFAULT_HEADERS,
    NAE_CLICKABLE_CASES,
    Filter,
    NAE_OPEN_SINGLE_TASK,
    NAE_SINGLE_TASK_QUERY
} from '@netgrif/components-core';
import {HeaderComponent} from '../../../../../header/header.component'
import {DefaultTabbedTaskViewComponent} from '../../tabbed/default-tabbed-task-view/default-tabbed-task-view.component';
import {
    InjectedTabbedTaskViewDataWithNavigationItemTaskData
} from "../../model/injected-tabbed-task-view-data-with-navigation-item-task-data";
import {
    DefaultTabbedSingleTaskViewComponent
} from "../../tabbed/default-tabbed-single-task-view/default-tabbed-single-task-view.component";

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory, allowedNets: Array<string>) => {
    if (allowedNets?.length > 0) {
        return factory.createFromArray(allowedNets);
    } else {
        return factory.createWithAllNets();
    }
};

@Component({
    selector: 'nc-default-case-view',
    templateUrl: './default-case-ref-list-view.component.html',
    styleUrls: ['./default-case-ref-list-view.component.scss'],
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        OverflowService,
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory, NAE_DATAFIELD_ALLOWED_NETS]
        },
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'case'},
        ViewIdService,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
    ],
})
export class DefaultCaseRefListViewComponent extends AbstractCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    public additionalFilterData: TaskSetDataRequestFields;
    public search: boolean;
    public createCase: boolean;
    public caseHeadersCount;

    constructor(caseViewService: CaseViewService,
                @Optional() overflowService: OverflowService,
                @Optional() @Inject(NAE_TAB_DATA) protected _injectedTabData: InjectedTabbedTaskViewDataWithNavigationItemTaskData,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) protected _dataFieldPortalData: DataFieldPortalData<MultichoiceField | CaseRefField | EnumerationField>,
                @Optional() @Inject(NAE_CASE_REF_CREATE_CASE) protected _caseRefCreateCase: boolean = false,
                @Optional() @Inject(NAE_CASE_REF_SEARCH) protected _caseRefSearch: boolean = false,
                @Optional() @Inject(NAE_DEFAULT_HEADERS) protected _caseHeaders: string[],
                @Optional() @Inject(NAE_CLICKABLE_CASES) protected _clickableCases: boolean = true,
                @Optional() @Inject(NAE_OPEN_SINGLE_TASK) protected _openSingleTask: boolean = false,
                @Optional() @Inject(NAE_SINGLE_TASK_QUERY) protected _singleTaskQuery: string) {
        super(caseViewService, overflowService, undefined, {
            enableCaseTitle: true,
            isCaseTitleRequired: true
        });
        this.search = !!_caseRefSearch;
        this.createCase = !!_caseRefCreateCase;
        this.caseHeadersCount = this._caseHeaders?.length;
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

    public isApproval() {
        return this._dataFieldPortalData?.dataField instanceof MultichoiceField || this._dataFieldPortalData?.dataField instanceof EnumerationField;
    }

    public handleCaseClick(clickedCase: Case): void {
        if (this._injectedTabData !== null  && this._clickableCases) {
            this.openTab(clickedCase);
        }
    }

    public disabled(): boolean {
        return this._dataFieldPortalData?.dataField?.formControlRef.disabled;
    }

    protected openTab(openCase: Case) {
        let baseFilter: Filter;
        if (this._singleTaskQuery !== undefined) {
            const query = JSON.parse(this._singleTaskQuery);
            if (query.query !== undefined) {
                query.query = query.query + ` AND caseId:${openCase.stringId}`;
            } else {
                if (query.case !== undefined) {
                    query.case.id = openCase.stringId
                } else {
                    query.case = {id: `${openCase.stringId}`};
                }
            }
            baseFilter = SimpleFilter.fromTaskQuery(query);
        } else {
            baseFilter = new SimpleFilter('', FilterType.TASK, {case: {id: `${openCase.stringId}`}});
        }
        this._injectedTabData.tabViewRef.openTab({
            label: {
                text: openCase.title,
                icon: openCase.icon ? openCase.icon : 'check_box'
            },
            canBeClosed: true,
            tabContentComponent: this._openSingleTask ? DefaultTabbedSingleTaskViewComponent : DefaultTabbedTaskViewComponent,
            injectedObject: {
                baseFilter: baseFilter,
                allowedNets: [openCase.processIdentifier],
                navigationItemTaskData: this._injectedTabData.navigationItemTaskData,
                searchTypeConfiguration: {
                    initialSearchMode: SearchMode.FULLTEXT,
                    showSearchToggleButton: true
                },
                showMoreMenu: true,
                headersChangeable: true,
                headersMode: ['sort', 'edit'],
                allowTableMode: true,
                defaultHeadersMode: 'sort'
            },
            order: this._injectedTabData['tabViewOrder'],
            parentUniqueId: this._injectedTabData.tabUniqueId
        }, true, true);
    }

    createdCase(caze: Case) {
        this.handleCaseClick(caze);
    }
}
