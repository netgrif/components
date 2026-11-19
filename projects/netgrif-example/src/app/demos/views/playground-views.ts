import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, InjectionToken, Input, Optional, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
    AbstractCaseViewComponent,
    AbstractTabbedCaseViewComponent,
    AbstractTabbedTaskViewComponent,
    AbstractSingleTaskViewComponent,
    AbstractTaskViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BaseFilter,
    Case,
    CaseViewService,
    CategoryFactory,
    ChangedFieldsService,
    defaultCaseSearchCategoriesFactory,
    defaultTaskSearchCategoriesFactory,
    FinishTaskService,
    FrontActionService,
    InjectedTabbedCaseViewData,
    InjectedTabbedTaskViewData,
    LoggerService,
    NAE_BASE_FILTER,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    NAE_TASK_OPERATIONS,
    NAE_TASK_VIEW_CONFIGURATION,
    NAE_VIEW_ID_SEGMENT,
    OverflowService,
    SearchMode,
    SearchService,
    SimpleFilter,
    SubjectTaskOperations,
    tabbedAllowedNetsServiceFactory,
    tabbedTaskViewConfigurationFactory,
    TaskDataService,
    TaskEventService,
    TaskRequestStateService,
    TaskViewService,
    ViewIdService,
} from '@netgrif/components-core';
import {HeaderComponent} from '@netgrif/components';

/** Processes of the playground mock engine. */
export const PLAYGROUND_NETS = ['insurance_claim', 'leave_request'];

/**
 * Processes a view shows. Provided by the parent (e.g. the content of a menu item), all playground processes when missing.
 */
export const PLAYGROUND_VIEW_NETS = new InjectionToken<Array<string>>('PlaygroundViewNets');

export function playgroundAllowedNetsFactory(factory: AllowedNetsServiceFactory, nets?: Array<string>): AllowedNetsService {
    return factory.createFromArray(nets ?? PLAYGROUND_NETS);
}

export function allCasesFilterFactory(nets?: Array<string>): BaseFilter {
    return {filter: SimpleFilter.fromCaseQuery({process: (nets ?? PLAYGROUND_NETS).map(identifier => ({identifier}))})};
}

export function allTasksFilterFactory(nets?: Array<string>): BaseFilter {
    return {filter: SimpleFilter.fromTaskQuery({process: (nets ?? PLAYGROUND_NETS).map(identifier => ({identifier}))})};
}

const VIEW_NETS = [new Optional(), PLAYGROUND_VIEW_NETS];

export function tabbedTaskBaseFilterFactory(tabData: InjectedTabbedTaskViewData): BaseFilter {
    return {filter: tabData.baseFilter};
}

/**
 * Case view: search, create case button, header and paginated case list.
 * The pattern of an application view: a component extending `AbstractCaseViewComponent` with its own services.
 */
@Component({
    selector: 'ne-case-view',
    templateUrl: './case-view.component.html',
    styleUrls: ['./views.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        OverflowService,
        ViewIdService,
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'playground-cases'},
        {provide: NAE_BASE_FILTER, useFactory: allCasesFilterFactory, deps: [VIEW_NETS]},
        {provide: AllowedNetsService, useFactory: playgroundAllowedNetsFactory, deps: [AllowedNetsServiceFactory, VIEW_NETS]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
    ],
})
export class PlaygroundCaseViewComponent extends AbstractCaseViewComponent implements AfterViewInit {
    @ViewChild('header') caseHeaderComponent: HeaderComponent;

    @Input() showCreateCaseButton = true;
    @Input() showDeleteMenu = true;
    @Input() enableSearch = true;
    /** last clicked case, shown by the demo */
    @Input() caseClicked: (c: Case) => void = () => undefined;

    constructor(caseViewService: CaseViewService, @Optional() overflowService: OverflowService) {
        super(caseViewService, overflowService, undefined, {enableCaseTitle: true, isCaseTitleRequired: true});
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

    handleCaseClick(clickedCase: Case): void {
        this.caseClicked(clickedCase);
    }
}

/**
 * Case view with the advanced search: the search builds a PFQL query from the predicates (category, operator, value),
 * the view shows the query it sends to the engine (`workflow/case/search_pfql`).
 */
@Component({
    selector: 'ne-search-view',
    template: `
        <div class="view">
            <div class="search-row">
                <nc-search class="search"
                           [initialSearchMode]="initialSearchMode"
                           [showSearchToggleButton]="showSearchToggleButton"
                           [showAdvancedSearchHelp]="showAdvancedSearchHelp"
                           [showSaveFilterButton]="false"
                           [showLoadFilterButton]="false"></nc-search>
            </div>
            <div class="query-row">
                <span class="query-label">PFQL</span>
                <code class="query">{{ (query$ | async) || '–' }}</code>
            </div>
            <nc-case-list-paginator class="list"
                                    [width]="getWidth()"
                                    [selectedHeaders$]="selectedHeaders$"
                                    [showDeleteMenu]="false"
                                    [responsiveBody]="true"
                                    [textEllipsis]="true">
                <nc-header #header ncListHeader [type]="headerType" [responsiveHeaders]="true" [ngStyle]="{ width: getWidth() }"></nc-header>
            </nc-case-list-paginator>
        </div>`,
    styleUrls: ['./views.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        OverflowService,
        ViewIdService,
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'playground-search'},
        {provide: NAE_BASE_FILTER, useFactory: allCasesFilterFactory, deps: [VIEW_NETS]},
        {provide: AllowedNetsService, useFactory: playgroundAllowedNetsFactory, deps: [AllowedNetsServiceFactory, VIEW_NETS]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
    ],
})
export class PlaygroundSearchViewComponent extends AbstractCaseViewComponent implements AfterViewInit {
    @ViewChild('header') caseHeaderComponent: HeaderComponent;

    @Input() initialSearchMode: SearchMode = SearchMode.ADVANCED;
    @Input() showSearchToggleButton = true;
    @Input() showAdvancedSearchHelp = true;

    /** PFQL query of the active filter (the search predicates), empty without predicates */
    readonly query$: Observable<string>;

    constructor(caseViewService: CaseViewService, @Optional() overflowService: OverflowService, searchService: SearchService) {
        super(caseViewService, overflowService);
        this.query$ = searchService.activeFilter$.pipe(map(filter => {
            const body = filter.getRequestBody() as any;
            return (Array.isArray(body) ? body : [body]).map(part => part?.query).find(q => typeof q === 'string') ?? '';
        }));
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

    handleCaseClick(): void {
    }
}

/** Task view: search, header and paginated task list with task forms. */
@Component({
    selector: 'ne-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./views.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ChangedFieldsService,
        ViewIdService,
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'playground-tasks'},
        {provide: NAE_BASE_FILTER, useFactory: allTasksFilterFactory, deps: [VIEW_NETS]},
        {provide: AllowedNetsService, useFactory: playgroundAllowedNetsFactory, deps: [AllowedNetsServiceFactory, VIEW_NETS]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
    ],
})
export class PlaygroundTaskViewComponent extends AbstractTaskViewComponent implements AfterViewInit {
    @ViewChild('header') taskHeaderComponent: HeaderComponent;

    @Input() enableSearch = true;
    @Input() allowMultiOpen = false;

    constructor(taskViewService: TaskViewService) {
        super(taskViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}

/** Case list of the tabbed view, a click on a case opens its tasks in a new tab. */
@Component({
    selector: 'ne-tabbed-case-view',
    templateUrl: './case-view.component.html',
    styleUrls: ['./views.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        OverflowService,
        ViewIdService,
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'playground-tabbed-cases'},
        {provide: NAE_BASE_FILTER, useFactory: allCasesFilterFactory, deps: [VIEW_NETS]},
        {provide: AllowedNetsService, useFactory: playgroundAllowedNetsFactory, deps: [AllowedNetsServiceFactory, VIEW_NETS]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
    ],
})
export class PlaygroundTabbedCaseViewComponent extends AbstractTabbedCaseViewComponent implements AfterViewInit {
    @ViewChild('header') caseHeaderComponent: HeaderComponent;

    showCreateCaseButton = true;
    showDeleteMenu = true;
    enableSearch = true;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                @Optional() overflowService: OverflowService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData) {
        super(caseViewService, loggerService, injectedTabData, overflowService, undefined, undefined,
            {enableCaseTitle: true, isCaseTitleRequired: true});
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }
}

/**
 * Tasks of one case, opened in a tab of the tabbed view. The tab header is hidden (M3 design of the frontend),
 * the user goes back to the case list with the back button of the view.
 */
@Component({
    selector: 'ne-tabbed-task-view',
    templateUrl: './tabbed-task-view.component.html',
    styleUrls: ['./views.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ChangedFieldsService,
        {provide: ViewIdService, useValue: null},
        {provide: NAE_BASE_FILTER, useFactory: tabbedTaskBaseFilterFactory, deps: [NAE_TAB_DATA]},
        {provide: AllowedNetsService, useFactory: tabbedAllowedNetsServiceFactory, deps: [AllowedNetsServiceFactory, NAE_TAB_DATA]},
        {provide: NAE_TASK_VIEW_CONFIGURATION, useFactory: tabbedTaskViewConfigurationFactory, deps: [NAE_TAB_DATA]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
    ],
})
export class PlaygroundTabbedTaskViewComponent extends AbstractTabbedTaskViewComponent implements AfterViewInit {
    @ViewChild('header') taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService, @Inject(NAE_TAB_DATA) private _tabData: InjectedTabbedTaskViewData) {
        super(taskViewService, _tabData);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }

    /** closes this tab, the tab view switches back to the case list */
    back(): void {
        this._tabData.tabViewRef.closeTabUniqueId(this._tabData.tabUniqueId);
    }
}

/* ------------------------------------------------------------------ single task view */

/** Task shown by the single task view: case and transition. */
export const PLAYGROUND_SINGLE_TASK = new InjectionToken<{ caseId: string, transitionId: string }>('PlaygroundSingleTask');

export function singleTaskFilterFactory(task: { caseId: string, transitionId: string }): BaseFilter {
    return {filter: SimpleFilter.fromTaskQuery({case: {id: task.caseId}, transitionId: task.transitionId})};
}

/**
 * One task without a list: its form with the action buttons, e.g. a form opened from a link or a menu item.
 */
@Component({
    selector: 'ne-single-task-view',
    template: `
        <div class="single-task">
            <nc-single-task [task$]="task$" [loading$]="loading$" [selectedHeaders$]="selectedHeaders$"
                            [hidePanelHeader]="true" [hideActionRow]="false" [showPageHeader]="true" [showPageFooter]="false"
                            actionRowJustifyContent="end"
                            [actionButtonTemplates]="[finishButton]"></nc-single-task>
        </div>
        <ng-template #finishButton let-finish="finish">
            <button mat-flat-button (click)="finish()">{{ (getFinishTitle() || 'tasks.view.finish') | translate }}</button>
        </ng-template>`,
    styles: [':host { display: block; height: 100%; } .single-task { box-sizing: border-box; height: 100%; overflow: auto; padding: 16px 24px; }'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ChangedFieldsService,
        ViewIdService,
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'playground-single-task'},
        {provide: NAE_BASE_FILTER, useFactory: singleTaskFilterFactory, deps: [PLAYGROUND_SINGLE_TASK]},
        {provide: AllowedNetsService, useFactory: playgroundAllowedNetsFactory, deps: [AllowedNetsServiceFactory, VIEW_NETS]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
        // task services of the single task (the same set as nc-default-single-task-view)
        TaskDataService,
        FrontActionService,
        FinishTaskService,
        TaskRequestStateService,
        TaskEventService,
        {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
    ],
})
export class PlaygroundSingleTaskViewComponent extends AbstractSingleTaskViewComponent {
    constructor(taskViewService: TaskViewService, activatedRoute: ActivatedRoute) {
        super(taskViewService, activatedRoute);
    }

    /** finish button label from the process (`<finishTitle>`), the default label otherwise */
    getFinishTitle(): string | undefined {
        return this.finishTitle;
    }
}
