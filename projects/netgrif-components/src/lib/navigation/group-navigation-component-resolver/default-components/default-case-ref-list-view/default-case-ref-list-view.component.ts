import {AfterViewInit, Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {
    AbstractCaseViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    Case,
    CaseViewService,
    CategoryFactory,
    defaultCaseSearchCategoriesFactory,
    FilterType,
    InjectedTabbedCaseViewData,
    NAE_CASE_REF_CREATE_CASE,
    NAE_CASE_REF_SEARCH,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    NAE_VIEW_ID_SEGMENT,
    OverflowService,
    SearchService,
    SimpleFilter,
    TaskSetDataRequestFields,
    ViewIdService
} from '@netgrif/components-core';
import {HeaderComponent} from '../../../../header/header.component'
import {DefaultTabbedTaskViewComponent} from '../default-tabbed-task-view/default-tabbed-task-view.component';

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
})
export class DefaultCaseRefListViewComponent extends AbstractCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    public additionalFilterData: TaskSetDataRequestFields;
    public search: boolean;
    public createCase: boolean;

    constructor(caseViewService: CaseViewService,
                @Optional() overflowService: OverflowService,
                @Optional() @Inject(NAE_TAB_DATA) protected _injectedTabData: InjectedTabbedCaseViewData,
                @Optional() @Inject(NAE_CASE_REF_CREATE_CASE) protected _caseRefCreateCase: boolean = false,
                @Optional() @Inject(NAE_CASE_REF_SEARCH) protected _caseRefSearch: boolean = false) {
        super(caseViewService, overflowService, undefined, {
            enableCaseTitle: true,
            isCaseTitleRequired: true
        });
        this.search = !!_caseRefCreateCase;
        this.createCase = !!_caseRefSearch;
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

    public handleCaseClick(clickedCase: Case): void {
        if (this._injectedTabData !== null) {
            this.openTab(clickedCase);
        }
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
                allowedNets: [openCase.processIdentifier]
            },
            order: this._injectedTabData.tabViewOrder,
            parentUniqueId: this._injectedTabData.tabUniqueId
        }, true, true);
    }
}
