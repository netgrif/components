import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Case, SearchMode, TabContent} from '@netgrif/components-core';
import {CodeSnippet} from '../../playground/code-block/code-block.component';
import {
    PlaygroundTabbedCaseViewComponent,
    PlaygroundTabbedTaskViewComponent,
} from './playground-views';

const VIEW_HEIGHT = '640px';

const DATA_NOTE = 'Offline: the cases and tasks come from the in-memory mock engine of the playground '
    + '(processes "Insurance claim" and "Leave request"), changes are kept until the page is reloaded.';

/* ------------------------------------------------------------------ case view */

@Component({
    selector: 'ne-case-view-demo',
    template: `
        <ne-demo-page title="Case view" [description]="description" [stacked]="true" [previewHeight]="height"
                      [api]="['AbstractCaseViewComponent', 'CaseViewService', 'nc-search', 'nc-header', 'nc-case-list-paginator', 'nc-create-case-button']"
                      [snippets]="snippets">
            <div demoPreview>
                <ng-container *neRerender="renderKey">
                <ne-case-view [showCreateCaseButton]="showCreateCaseButton" [showDeleteMenu]="showDeleteMenu"
                              [enableSearch]="enableSearch" [caseClicked]="caseClicked"></ne-case-view>
                </ng-container>
            </div>
            <div demoConfig class="ne-config">
                <mat-slide-toggle [(ngModel)]="enableSearch" (ngModelChange)="rerender()">Search</mat-slide-toggle>
                <mat-slide-toggle [(ngModel)]="showCreateCaseButton">Create case button</mat-slide-toggle>
                <mat-slide-toggle [(ngModel)]="showDeleteMenu">Delete menu in the rows</mat-slide-toggle>
                <p class="mat-body-medium">Clicked case: <b>{{ clicked ?? '–' }}</b></p>
            </div>
        </ne-demo-page>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class CaseViewDemoComponent {
    readonly height = VIEW_HEIGHT;
    readonly description = 'Searchable, paginated list of cases with a create case button. ' + DATA_NOTE;
    enableSearch = true;
    showCreateCaseButton = true;
    showDeleteMenu = true;
    clicked: string | undefined;
    renderKey = 0;

    caseClicked = (c: Case) => this.clicked = c.title;

    rerender(): void {
        this.renderKey++;
    }

    get snippets(): Array<CodeSnippet> {
        return [{
            label: 'TypeScript',
            code: `@Component({
    selector: 'app-case-view',
    templateUrl: './case-view.component.html',
    providers: [
        CategoryFactory, CaseViewService, SearchService, OverflowService, ViewIdService,
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'cases'},
        {provide: NAE_BASE_FILTER, useValue: {filter: SimpleFilter.emptyCaseFilter()}},
        {provide: AllowedNetsService, useFactory: (f: AllowedNetsServiceFactory) => f.createFromArray(['insurance_claim']),
            deps: [AllowedNetsServiceFactory]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
    ],
})
export class CaseViewComponent extends AbstractCaseViewComponent implements AfterViewInit {
    @ViewChild('header') caseHeaderComponent: HeaderComponent;

    constructor(caseViewService: CaseViewService, @Optional() overflowService: OverflowService) {
        super(caseViewService, overflowService, undefined, {enableCaseTitle: true, isCaseTitleRequired: true});
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }
}`,
        }, {
            label: 'HTML',
            code: `${this.enableSearch ? '<nc-search></nc-search>\n' : ''}${this.showCreateCaseButton
                ? '<nc-create-case-button [newCaseCreationConfig]="newCaseCreationConfig" (caseCreatedEvent)="handleCaseClick($event)"></nc-create-case-button>\n'
                : ''}<!-- the header is projected into the list: header and rows scroll together, the paginator stays below them -->
<nc-case-list-paginator [selectedHeaders$]="selectedHeaders$" [showDeleteMenu]="${this.showDeleteMenu}"
                        (caseClick)="handleCaseClick($event)">
    <nc-header #header ncListHeader [type]="headerType" [responsiveHeaders]="true"></nc-header>
</nc-case-list-paginator>`,
        }];
    }
}

/* ------------------------------------------------------------------ advanced search */

@Component({
    selector: 'ne-advanced-search-demo',
    template: `
        <ne-demo-page title="Advanced search" [description]="description" [stacked]="true" [previewHeight]="height"
                      [api]="['nc-search', 'SearchService', 'CategoryFactory', 'NAE_SEARCH_CATEGORIES', 'defaultCaseSearchCategoriesFactory']"
                      [snippets]="snippets">
            <div demoPreview>
                <ng-container *neRerender="renderKey">
                <ne-search-view [initialSearchMode]="advanced ? searchModes.ADVANCED : searchModes.FULLTEXT"
                                [showSearchToggleButton]="showToggle"
                                [showAdvancedSearchHelp]="showHelp"></ne-search-view>
                </ng-container>
            </div>
            <div demoConfig class="ne-config">
                <mat-slide-toggle [(ngModel)]="advanced" (ngModelChange)="rerender()">Advanced search at the start</mat-slide-toggle>
                <mat-slide-toggle [(ngModel)]="showToggle" (ngModelChange)="rerender()">Fulltext / advanced toggle button</mat-slide-toggle>
                <mat-slide-toggle [(ngModel)]="showHelp" (ngModelChange)="rerender()">Help button</mat-slide-toggle>
                <p class="mat-body-small">Pick a category (case title, process, author, creation date, case data, …), an operator
                    and a value. "+ and" adds a condition, the menu of a condition adds an "or" branch. The search sends the PFQL query
                    shown under it; the mock engine of the playground evaluates it (eq, neq, contains, lt / gt, ranges, lists,
                    and / or / not).</p>
                <p class="mat-body-small">Try: <i>Case title</i> contains <i>leave</i>, <i>Case creation date</i> is more than
                    a week ago, <i>Case data</i> → <i>Claimed amount</i> is more than <i>1000</i>.</p>
            </div>
        </ne-demo-page>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class AdvancedSearchDemoComponent {
    readonly height = VIEW_HEIGHT;
    readonly searchModes = SearchMode;
    readonly description = 'Advanced search of a case view: conditions built from search categories, combined with and / or, '
        + 'sent to the engine as a PFQL query. ' + DATA_NOTE;
    advanced = true;
    showToggle = true;
    showHelp = true;
    renderKey = 0;

    rerender(): void {
        this.renderKey++;
    }

    get snippets(): Array<CodeSnippet> {
        return [{
            label: 'TypeScript',
            code: `@Component({
    selector: 'app-case-view',
    templateUrl: './case-view.component.html',
    providers: [
        CategoryFactory, CaseViewService, SearchService, OverflowService, ViewIdService,
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'cases'},
        {provide: NAE_BASE_FILTER, useValue: {filter: SimpleFilter.emptyCaseFilter()}},
        {provide: AllowedNetsService, useFactory: (f: AllowedNetsServiceFactory) => f.createFromArray(['insurance_claim']),
            deps: [AllowedNetsServiceFactory]},
        // the categories offered by the advanced search (title, process, author, creation date, case data, ...)
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
    ],
})
export class CaseViewComponent extends AbstractCaseViewComponent {
    // the generated query: searchService.activeFilter$ (PFQL in the request body, endpoint workflow/case/search_pfql)
}`,
        }, {
            label: 'HTML',
            code: `<nc-search [initialSearchMode]="${this.advanced ? 'SearchMode.ADVANCED' : 'SearchMode.FULLTEXT'}"
           [showSearchToggleButton]="${this.showToggle}"
           [showAdvancedSearchHelp]="${this.showHelp}"
           [showSaveFilterButton]="false"
           [showLoadFilterButton]="false"></nc-search>`,
        }, {
            label: 'PFQL',
            code: `cases: (title contains 'leave') and (creationDate gt 2026-10-01)
cases: (data.amount.value gt 1000) or (processIdentifier eq 'leave_request')`,
        }];
    }
}

/* ------------------------------------------------------------------ task view */

@Component({
    selector: 'ne-task-view-demo',
    template: `
        <ne-demo-page title="Task view" [description]="description" [stacked]="true" [previewHeight]="height"
                      [api]="['AbstractTaskViewComponent', 'TaskViewService', 'nc-header', 'nc-task-list-pagination']"
                      [snippets]="snippets">
            <div demoPreview>
                <ng-container *neRerender="renderKey">
                <ne-task-view [enableSearch]="enableSearch" [allowMultiOpen]="allowMultiOpen"></ne-task-view>
                </ng-container>
            </div>
            <div demoConfig class="ne-config">
                <mat-slide-toggle [(ngModel)]="enableSearch" (ngModelChange)="rerender()">Search</mat-slide-toggle>
                <mat-slide-toggle [(ngModel)]="allowMultiOpen" (ngModelChange)="rerender()">Several tasks open at once</mat-slide-toggle>
                <p class="mat-body-small">Open a task, assign it, fill in the form and finish it. The next task of the case
                    appears in the list (register → assess → pay out).</p>
            </div>
        </ne-demo-page>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class TaskViewDemoComponent {
    readonly height = VIEW_HEIGHT;
    readonly description = 'Tasks of all cases with their forms, task events (assign, finish, cancel, delegate). ' + DATA_NOTE;
    enableSearch = true;
    allowMultiOpen = false;
    renderKey = 0;

    rerender(): void {
        this.renderKey++;
    }

    get snippets(): Array<CodeSnippet> {
        return [{
            label: 'TypeScript',
            code: `@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    providers: [
        CategoryFactory, TaskViewService, SearchService, ChangedFieldsService, ViewIdService,
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'tasks'},
        {provide: NAE_BASE_FILTER, useValue: {filter: SimpleFilter.emptyTaskFilter()}},
        {provide: AllowedNetsService, useFactory: (f: AllowedNetsServiceFactory) => f.createFromArray(['insurance_claim']),
            deps: [AllowedNetsServiceFactory]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
    ],
})
export class TaskViewComponent extends AbstractTaskViewComponent implements AfterViewInit {
    @ViewChild('header') taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService) {
        super(taskViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}`,
        }, {
            label: 'HTML',
            code: `${this.enableSearch ? '<nc-search></nc-search>\n' : ''}<!-- the header is projected into the list: header and rows scroll together, the paginator stays below them -->
<nc-task-list-pagination [tasks$]="tasks$" [loading$]="loading$" [allowMultiOpen]="${this.allowMultiOpen}"
                         [selectedHeaders$]="selectedHeaders$">
    <nc-header #header ncListHeader type="task" [responsiveHeaders]="true"></nc-header>
</nc-task-list-pagination>`,
        }];
    }
}

/* ------------------------------------------------------------------ tabbed views */

@Component({
    selector: 'ne-tabbed-view-demo',
    template: `
        <ne-demo-page title="Tabbed case & task view" [description]="description" [stacked]="true" [previewHeight]="height"
                      [api]="['nc-tab-view', 'TabContent', 'AbstractTabbedCaseViewComponent', 'AbstractTabbedTaskViewComponent', 'NAE_TAB_DATA']"
                      [snippets]="snippets">
            <div demoPreview>
                <ng-container *neRerender="renderKey">
                <nc-tab-view [initialTabs]="tabs" [hideHeader]="hideHeader" stretch="false"></nc-tab-view>
                </ng-container>
            </div>
            <div demoConfig class="ne-config">
                <mat-slide-toggle [(ngModel)]="hideHeader" (ngModelChange)="rerender()">Hide tab header (netgrif-frontend)</mat-slide-toggle>
                <p class="mat-body-small">A click on a case opens its tasks in a new tab. With the hidden tab header the user
                    returns to the cases with the back button of the task view (Material 3 navigation, no tabs).</p>
            </div>
        </ne-demo-page>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class TabbedViewDemoComponent {
    readonly height = VIEW_HEIGHT;
    readonly description = 'Case list in a tab view, the tasks of a case open in a new tab. ' + DATA_NOTE;
    hideHeader = true;
    renderKey = 0;

    readonly tabs: Array<TabContent> = [{
        label: {text: 'Cases', icon: 'folder'},
        canBeClosed: false,
        tabContentComponent: PlaygroundTabbedCaseViewComponent,
        injectedObject: {tabViewComponent: PlaygroundTabbedTaskViewComponent, tabViewOrder: 0},
    }];

    rerender(): void {
        this.renderKey++;
    }

    get snippets(): Array<CodeSnippet> {
        return [{
            label: 'TypeScript',
            code: `tabs: Array<TabContent> = [{
    label: {text: 'Cases', icon: 'folder'},
    canBeClosed: false,
    tabContentComponent: TabbedCaseViewComponent,        // extends AbstractTabbedCaseViewComponent
    injectedObject: {
        tabViewComponent: TabbedTaskViewComponent,       // extends AbstractTabbedTaskViewComponent
        tabViewOrder: 0,
    },
}];

// TabbedTaskViewComponent: back to the case list
back(): void {
    this._tabData.tabViewRef.closeTabUniqueId(this._tabData.tabUniqueId);
}`,
        }, {
            label: 'HTML',
            code: `<nc-tab-view [initialTabs]="tabs" [hideHeader]="${this.hideHeader}" stretch="false"></nc-tab-view>`,
        }];
    }
}

/* ------------------------------------------------------------------ process builder view */

@Component({
    selector: 'ne-builder-view-demo',
    template: `
        <ne-demo-page title="Process view" [description]="description" [stacked]="true" previewHeight="760px"
                      [api]="['nc-default-process-view', 'NavigationComponentModule', 'nc-default-process-case-view', 'nc-builder']"
                      [snippets]="snippets">
            <div demoPreview>
                <nc-default-process-view [ngClass]="'ne-density-' + -density"></nc-default-process-view>
            </div>
            <div demoConfig class="ne-config">
                <mat-form-field>
                    <mat-label>Density</mat-label>
                    <mat-select [(ngModel)]="density">
                        @for (d of densities; track d) {
                        <mat-option [value]="d">{{ d }}{{ d === 0 ? ' (default)' : '' }}</mat-option>
                        }
                    </mat-select>
                    <mat-hint>of the whole builder: data fields of the data mode, edit panel, form builder</mat-hint>
                </mat-form-field>
                <p class="mat-body-small">"Insurance claim" is a draft: the builder edits it and every change is saved into the
                    <code>xml_text</code> field of its <code>form</code> task. "Leave request" is deployed and opens read-only.</p>
            </div>
        </ne-demo-page>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class BuilderViewDemoComponent {
    /** Material 3 density of the builder, `ne-density-*` classes of the playground styles */
    readonly densities = [0, -1, -2, -3, -4, -5];
    density = 0;

    readonly description = 'Default process view of the libraries (it replaces the workflow view): the list of processes '
        + '(cases of the "process" net), a process opens in the Petriflow builder in a new tab. ' + DATA_NOTE;

    readonly snippets: Array<CodeSnippet> = [{
        label: 'HTML',
        code: `<!-- NavigationComponentModule (and BuilderModule) -->
<nc-default-process-view></nc-default-process-view>`,
    }, {
        label: 'nae.json',
        code: `"processes": {
    "component": {"class": "DefaultProcessViewComponent"},
    "access": "private",
    "navigation": true,
    "routing": {"path": "processes"}
}

// ViewService of the application
{id: 'DefaultProcessViewComponent', class: DefaultProcessViewComponent}`,
    }, {
        label: 'SCSS',
        code: `// denser builder (density -2): Material 3 density tokens on the builder only
.compact-builder {
    @include mat.theme((density: -2));
}`,
    }];
}
