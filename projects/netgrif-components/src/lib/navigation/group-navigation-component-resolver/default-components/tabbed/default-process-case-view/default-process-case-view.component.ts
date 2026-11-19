import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, Optional, ViewChild} from '@angular/core';
import {
    AbstractTabbedCaseViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BaseFilter,
    Case,
    CaseViewService,
    CategoryFactory,
    defaultCaseSearchCategoriesFactory,
    InjectedTabbedCaseViewData,
    LoggerService,
    NAE_BASE_FILTER,
    NAE_DEFAULT_HEADERS,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    OverflowService,
    SearchService,
    SimpleFilter,
    ViewIdService
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {HeaderComponent} from '../../../../../header/header.component';
import {BuilderMode} from '../../../../../builder/services/builder-mode.service';

/** identifier of the process (Petri net) whose cases are the processes of the builder */
export const PROCESS_NET_IDENTIFIER = 'process';

export function processViewBaseFilterFactory(): BaseFilter {
    return {filter: SimpleFilter.fromCaseQuery({process: {identifier: PROCESS_NET_IDENTIFIER}})};
}

export function processViewAllowedNetsFactory(factory: AllowedNetsServiceFactory): AllowedNetsService {
    return factory.createFromArray([PROCESS_NET_IDENTIFIER]);
}

/**
 * The list of the processes of the default process view (cases of the `process` net) with the search and the create button.
 * A click on a process opens the component of the `tabViewComponent` of the tab data (the builder) in a new tab,
 * the process case is its `processCase` (`InjectedTabbedBuilderViewData`).
 */
@Component({
    selector: 'nc-default-process-case-view',
    templateUrl: './default-process-case-view.component.html',
    styleUrls: ['./default-process-case-view.component.scss'],
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        OverflowService,
        ViewIdService,
        {provide: NAE_BASE_FILTER, useFactory: processViewBaseFilterFactory},
        {provide: AllowedNetsService, useFactory: processViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
        {provide: NAE_DEFAULT_HEADERS, useValue: ['process-title', 'process-id', 'process-version', 'process-state']},
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DefaultProcessCaseViewComponent extends AbstractTabbedCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    /** the process created by the "New process" button, it opens in the edit mode of the builder (to draw it) */
    protected _newProcessId: string | undefined;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                @Optional() overflowService: OverflowService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData,
                translateService: TranslateService) {
        super(caseViewService, loggerService, injectedTabData, overflowService, undefined, undefined, {
            enableCaseTitle: false,
            isCaseTitleRequired: true,
            newCaseButtonConfig: {
                createCaseButtonTitle: translateService.instant('workflow.new-process'),
                createCaseButtonIcon: 'add'
            }
        });
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

    /** a new process opens in the edit mode of the builder, the existing ones in the process mode */
    public openNewProcess(newCase: Case): void {
        this._newProcessId = newCase?.stringId;
        this.handleCaseClick(newCase);
    }

    /** opens the process case in the builder (the `tabViewComponent` of the tab data) */
    protected openTab(openCase: Case): void {
        const initialMode = openCase.stringId === this._newProcessId ? BuilderMode.MODELER : undefined;
        this._newProcessId = undefined;
        this._injectedTabData.tabViewRef.openTab({
            label: {text: openCase.title, icon: openCase.icon ? openCase.icon : 'account_tree'},
            canBeClosed: true,
            tabContentComponent: this._injectedTabData.tabViewComponent,
            injectedObject: {processCase: openCase, initialMode},
            order: this._injectedTabData.tabViewOrder,
            parentUniqueId: this._injectedTabData.tabUniqueId
        }, this._autoswitchToTaskTab, this._openExistingTab);
    }
}
