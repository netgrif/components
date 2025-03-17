import {AfterViewInit, Component, Inject, Optional, ViewChild} from '@angular/core';
import {
    AbstractCaseViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    Case,
    CaseViewService,
    CategoryFactory,
    DataSet,
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
    ViewIdService, DATA_FIELD_PORTAL_DATA, DataFieldPortalData, MultichoiceField, EnumerationField
} from '@netgrif/components-core';
import {HeaderComponent} from '../../../../header/header.component'
import {DefaultTabbedTaskViewComponent} from '../default-tabbed-task-view/default-tabbed-task-view.component';
import {
    InjectedTabbedTaskViewDataWithNavigationItemTaskData
} from "../model/injected-tabbed-task-view-data-with-navigation-item-task-data";

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createWithAllNets();
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
            deps: [AllowedNetsServiceFactory]
        },
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'case'},
        ViewIdService,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
    ],
    standalone: false
})
export class DefaultCaseRefListViewComponent extends AbstractCaseViewComponent {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    public additionalFilterData: DataSet;
    public search: boolean;
    public createCase: boolean;

    constructor(caseViewService: CaseViewService,
                @Optional() overflowService: OverflowService,
                @Optional() @Inject(NAE_TAB_DATA) protected _injectedTabData: InjectedTabbedTaskViewDataWithNavigationItemTaskData,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) protected _dataFieldPortalData: DataFieldPortalData<MultichoiceField | CaseRefField | EnumerationField>,
                @Optional() @Inject(NAE_CASE_REF_CREATE_CASE) protected _caseRefCreateCase: boolean = false,
                @Optional() @Inject(NAE_CASE_REF_SEARCH) protected _caseRefSearch: boolean = false) {
        super(caseViewService, overflowService, undefined, {
            enableCaseTitle: true,
            isCaseTitleRequired: true
        });
        this.search = !!_caseRefSearch;
        this.createCase = !!_caseRefCreateCase;
    }

    public isApproval() {
        return this._dataFieldPortalData?.dataField instanceof MultichoiceField || this._dataFieldPortalData?.dataField instanceof EnumerationField;
    }

    public handleCaseClick(clickedCase: Case): void {
        if (this._injectedTabData !== null) {
            this.openTab(clickedCase);
        }
    }

    public disabled(): boolean {
        return this._dataFieldPortalData?.dataField?.formControlRef.disabled;
    }

    protected openTab(openCase: Case) {
        this._injectedTabData.tabViewRef.openTab({
            label: {
                text: openCase.title,
                icon: openCase.icon ? openCase.icon : 'check_box'
            },
            canBeClosed: true,
            tabContentComponent: DefaultTabbedTaskViewComponent,
            injectedObject: {
                baseFilter: new SimpleFilter('', FilterType.TASK, {case: {id: `${openCase.stringId}`}}),
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
