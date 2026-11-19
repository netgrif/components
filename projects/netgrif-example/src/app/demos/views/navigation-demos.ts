import {ChangeDetectionStrategy, Component, forwardRef, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TabContent, UriNodeResource, UriService} from '@netgrif/components-core';
import {CodeSnippet} from '../../playground/code-block/code-block.component';
import {MENU_ITEMS, menuItem} from '../../playground/mock-engine/mock-navigation';
import {DEFAULT_FORM_LAYOUT, FORM_LAYOUT} from '../../playground/mock-engine/mock-engine';
import {
    PLAYGROUND_SINGLE_TASK,
    PLAYGROUND_VIEW_NETS,
    PlaygroundTabbedCaseViewComponent,
    PlaygroundTabbedTaskViewComponent,
} from './playground-views';

const NAVIGATION_NOTE = 'The menu is the dynamic navigation of the engine: URI nodes and "menu_item" cases served by the '
    + 'mock engine of the playground (folders Claims, Human resources and the views in them).';

/* ------------------------------------------------------------------ double drawer */

@Component({
    selector: 'ne-navigation-demo',
    template: `
        <ne-demo-page title="Navigation double drawer" [description]="description" [stacked]="true" previewHeight="680px"
                      [api]="['nc-navigation-double-drawer', 'DoubleDrawerNavigationService', 'UriService', 'nc-breadcrumbs']"
                      [snippets]="snippets">
            <div demoPreview>
                <nc-navigation-double-drawer class="drawer" image="assets/img/netgrif_full_grey.svg"
                                             [includeUser]="includeUser" [includeLanguage]="includeLanguage"
                                             [includeImpersonation]="false" [allClosable]="allClosable">
                    <router-outlet></router-outlet>
                </nc-navigation-double-drawer>
            </div>
            <div demoConfig class="ne-config">
                <mat-slide-toggle [(ngModel)]="includeUser">User menu</mat-slide-toggle>
                <mat-slide-toggle [(ngModel)]="includeLanguage">Language menu</mat-slide-toggle>
                <mat-slide-toggle [(ngModel)]="allClosable">Rail closable together with the drawer</mat-slide-toggle>
                <p class="mat-body-small">Folders are in the rail, the views of the opened folder in the drawer. A view opens on
                    the route <code>/{{ route }}/&lt;base64 menu item id&gt;</code>, the playground renders the case or task view
                    the menu item stands for. The breadcrumbs of the opened menu item are part of the drawer layout, above every view (<code>[showBreadcrumbs]</code>).</p>
            </div>
        </ne-demo-page>`,
    styles: ['.drawer { height: 100%; }'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class NavigationDemoComponent {
    readonly description = 'Rail with folders and drawer with views, built from the menu items of the engine. ' + NAVIGATION_NOTE;
    readonly route = 'views/navigation/item';
    includeUser = true;
    includeLanguage = true;
    allClosable = true;

    readonly snippets: Array<CodeSnippet> = [{
        label: 'HTML',
        code: `<!-- NavigationComponentModule -->
<!-- the breadcrumbs of the opened menu item are shown above the page ([showBreadcrumbs]="false" turns them off) -->
<nc-navigation-double-drawer image="assets/img/logo.svg" [includeUser]="true" [includeLanguage]="true">
    <router-outlet></router-outlet>
</nc-navigation-double-drawer>`,
    }, {
        label: 'nae.json',
        code: `"services": {
    "groupNavigation": {
        "groupNavigationRoute": "${this.route}"
    }
}`,
    }];
}

/** Home of the navigation demo, nothing selected yet. */
@Component({
    selector: 'ne-navigation-home',
    template: `
        <div class="content">
            <p class="mat-body-large">Pick a folder in the rail and a view in the drawer.</p>
        </div>`,
    styles: ['.content { padding: 16px 24px; }'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class NavigationHomeComponent {
}

/** What a menu item opens, as `GroupNavigationComponentResolverComponent` does in netgrif-frontend. */
@Component({
    selector: 'ne-navigation-item',
    template: `
        @if (item$ | async; as item) {
        <ng-container *neRerender="item.id">
        <!-- the breadcrumbs are in the layout (nc-navigation-double-drawer), above every view -->
        <div class="item">
            <ne-navigation-item-view class="view" [nets]="item.nets ?? []" [view]="item.view"></ne-navigation-item-view>
        </div>
        </ng-container>
        } @else {
        <p class="mat-body-large missing">Unknown menu item.</p>
        }`,
    styles: [`:host { display: block; height: 100%; }
        .item { display: flex; flex-direction: column; height: 100%; }
        .view { flex: 1 1 auto; min-height: 0; }
        .missing { padding: 24px; }`],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class NavigationItemComponent {
    readonly item$: Observable<ReturnType<typeof menuItem>>;

    constructor(route: ActivatedRoute) {
        this.item$ = route.paramMap.pipe(map(params => {
            try {
                return menuItem(atob(params.get('itemCaseId') ?? ''));
            } catch {
                return undefined;
            }
        }));
    }
}

/** Provides the processes of the menu item to the view inside it (`PLAYGROUND_VIEW_NETS`). */
@Component({
    selector: 'ne-navigation-item-view',
    template: `
        <!-- created after the inputs are set, the views read the processes when they are constructed -->
        @if (view) {
        @switch (view) {
        @case ('tasks') { <ne-task-view></ne-task-view> }
        @case ('tabbed') { <nc-tab-view [initialTabs]="tabs" [hideHeader]="true" stretch="false"></nc-tab-view> }
        @case ('processes') { <nc-default-process-view></nc-default-process-view> }
        @default { <ne-case-view></ne-case-view> }
        }
        }`,
    styles: [':host { display: block; height: 100%; }'],
    viewProviders: [
        {provide: PLAYGROUND_VIEW_NETS, useFactory: (host: NavigationItemViewComponent) => host.nets,
            deps: [forwardRef(() => NavigationItemViewComponent)]},
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class NavigationItemViewComponent {
    @Input() nets: Array<string> = [];
    @Input() view: string;

    /** tabbed view of a menu item: the case list, the tasks of a case open in a tab (tab header hidden) */
    readonly tabs: Array<TabContent> = [{
        label: {text: 'Cases', icon: 'folder'},
        canBeClosed: false,
        tabContentComponent: PlaygroundTabbedCaseViewComponent,
        injectedObject: {tabViewComponent: PlaygroundTabbedTaskViewComponent, tabViewOrder: 0},
    }];
}

/* ------------------------------------------------------------------ dashboard */

@Component({
    selector: 'ne-dashboard-demo',
    template: `
        <ne-demo-page title="Dashboard" [description]="description" [stacked]="true" previewHeight="560px"
                      [api]="['nc-dashboard', 'AbstractDashboardComponent', 'dashboard_management', 'dashboard_item']"
                      [snippets]="snippets">
            <div demoPreview>
                <nc-dashboard class="dashboard"></nc-dashboard>
            </div>
            <div demoConfig class="ne-config">
                <p class="mat-body-small">The tiles are "dashboard_item" cases of the "main_dashboard" management case. Internal tiles
                    open their menu item in the navigation demo, "Documentation" is an external link.</p>
            </div>
        </ne-demo-page>`,
    styles: ['.dashboard { display: block; height: 100%; overflow: auto; }'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class DashboardDemoComponent {
    readonly description = 'Welcome dashboard with tiles linking to menu items and external pages, configured in the engine. '
        + NAVIGATION_NOTE;
    readonly snippets: Array<CodeSnippet> = [{
        label: 'HTML',
        code: `<!-- NavigationComponentModule -->\n<nc-dashboard></nc-dashboard>`,
    }];
}

/* ------------------------------------------------------------------ breadcrumbs */

@Component({
    selector: 'ne-breadcrumbs-demo',
    template: `
        <ne-demo-page title="Breadcrumbs" [description]="description"
                      [api]="['nc-breadcrumbs', 'UriService', 'GroupNavigationConstants.GROUP_NAVIGATION_ROUTER_PARAM']"
                      [snippets]="snippets">
            <div demoPreview>
                <ng-container *neRerender="renderKey + '/' + itemId">
                @if (nodeReady) {
                <nc-breadcrumbs [showHome]="showHome" [showFilter]="showFilter" [redirectOnClick]="false"
                                [lengthOfPath]="lengthOfPath" [partsAfterDots]="partsAfterDots"></nc-breadcrumbs>
                }
                </ng-container>
            </div>
            <div demoConfig class="ne-config">
                <mat-form-field>
                    <mat-label>Opened menu item</mat-label>
                    <mat-select [ngModel]="itemId" (ngModelChange)="open($event)">
                        @for (item of items; track item.id) {
                        <mat-option [value]="item.id">{{ item.nodePath }} – {{ item.name }}</mat-option>
                        }
                    </mat-select>
                    <mat-hint>route parameter <code>itemCaseId</code> + <code>UriService.activeNode</code></mat-hint>
                </mat-form-field>
                <mat-slide-toggle [(ngModel)]="showHome" (ngModelChange)="rerender()">Home icon (showHome)</mat-slide-toggle>
                <mat-slide-toggle [(ngModel)]="showFilter" (ngModelChange)="rerender()">Name of the opened item (showFilter)</mat-slide-toggle>
                <mat-form-field>
                    <mat-label>Shorten paths longer than (lengthOfPath)</mat-label>
                    <input matInput type="number" [(ngModel)]="lengthOfPath" (ngModelChange)="rerender()">
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Parts after "…" (partsAfterDots)</mat-label>
                    <input matInput type="number" [(ngModel)]="partsAfterDots" (ngModelChange)="rerender()">
                </mat-form-field>
            </div>
        </ne-demo-page>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class BreadcrumbsDemoComponent {
    readonly description = 'Path of the opened menu item: the folders of its URI node and the item itself. Breadcrumbs read '
        + 'the menu item id from the route (itemCaseId) and the node from UriService. ' + NAVIGATION_NOTE;
    readonly items = MENU_ITEMS.filter(i => !i.folder);
    itemId: string;
    showHome = true;
    showFilter = true;
    lengthOfPath = 30;
    partsAfterDots = 2;
    renderKey = 0;
    /** breadcrumbs resolve the path once, they are created after the active node is set */
    nodeReady = false;

    constructor(private _uriService: UriService, private _router: Router, route: ActivatedRoute) {
        route.paramMap.subscribe(params => {
            const id = this.decode(params.get('itemCaseId'));
            if (!menuItem(id)) {
                this.open(this.items[0].id);
                return;
            }
            this.itemId = id;
            this.setActiveNode(menuItem(id).nodePath);
        });
    }

    open(id: string): void {
        this._router.navigate(['/views/breadcrumbs', btoa(id)]);
    }

    rerender(): void {
        this.renderKey++;
    }

    /** the node of the folder the item is in, as the double drawer sets it */
    private setActiveNode(itemPath: string): void {
        const folderPath = itemPath.substring(0, itemPath.lastIndexOf('/')) || '/';
        this.nodeReady = false;
        this._uriService.getNodeByPath(folderPath).subscribe((node: UriNodeResource) => {
            this._uriService.activeNode = node;
            this.nodeReady = true;
            this.rerender();
        });
    }

    private decode(value: string | null): string {
        try {
            return value ? atob(value) : '';
        } catch {
            return '';
        }
    }

    get snippets(): Array<CodeSnippet> {
        return [{
            label: 'HTML',
            code: `<!-- NavigationComponentModule; on the route <groupNavigationRoute>/:itemCaseId -->
<nc-breadcrumbs [showHome]="${this.showHome}" [showFilter]="${this.showFilter}"
                [lengthOfPath]="${this.lengthOfPath}" [partsAfterDots]="${this.partsAfterDots}"></nc-breadcrumbs>`,
        }];
    }
}

/* ------------------------------------------------------------------ single task view */

/** Provides the chosen task to the single task view inside it (`PLAYGROUND_SINGLE_TASK`). */
@Component({
    selector: 'ne-single-task-frame',
    // created after the input is set, the view reads the task when it is constructed
    template: '@if (task) { <ne-single-task-view></ne-single-task-view> }',
    styles: [':host { display: block; height: 100%; }'],
    viewProviders: [
        {provide: PLAYGROUND_SINGLE_TASK, useFactory: (host: SingleTaskFrameComponent) => host.task,
            deps: [forwardRef(() => SingleTaskFrameComponent)]},
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class SingleTaskFrameComponent {
    @Input() task: { caseId: string, transitionId: string };
}

@Component({
    selector: 'ne-single-task-demo',
    template: `
        <ne-demo-page title="Single task view" [description]="description" [stacked]="true" previewHeight="620px"
                      [api]="['AbstractSingleTaskViewComponent', 'nc-single-task', 'TaskLayout', 'DataGroupLayout', 'Layout']"
                      [snippets]="snippets">
            <div demoPreview>
                <div class="density-frame" [ngClass]="density === null ? '' : 'ne-density-' + -density">
                <ng-container *neRerender="renderKey">
                <ne-single-task-frame [task]="selected"></ne-single-task-frame>
                </ng-container>
                </div>
            </div>
            <div demoConfig class="ne-config single-task-config">
                <mat-form-field>
                    <mat-label>Task</mat-label>
                    <mat-select [(ngModel)]="selected" (ngModelChange)="rerender()">
                        @for (option of options; track option.label) {
                        <mat-option [value]="option.task">{{ option.label }}</mat-option>
                        }
                    </mat-select>
                    <mat-hint>a task of an initial case of the mock engine</mat-hint>
                </mat-form-field>

                <h3 class="mat-title-small">Density</h3>
                <div class="row">
                    <mat-form-field>
                        <mat-label>Density</mat-label>
                        <mat-select [(ngModel)]="density">
                            <mat-option [value]="null">task form default (density of the page)</mat-option>
                            @for (d of densities; track d) {
                            <mat-option [value]="d">{{ d }}</mat-option>
                            }
                        </mat-select>
                        <mat-hint>Material 3 density of the whole form: fields, buttons, chips, panels</mat-hint>
                    </mat-form-field>
                </div>

                <h3 class="mat-title-small">Task layout <code>&lt;transition&gt;&lt;layout&gt;</code></h3>
                <div class="row">
                    <mat-form-field>
                        <mat-label>Columns</mat-label>
                        <input matInput type="number" min="1" [(ngModel)]="layout.cols" (ngModelChange)="rerender()">
                    </mat-form-field>
                    <mat-form-field>
                        <mat-label>Field alignment</mat-label>
                        <mat-select [(ngModel)]="layout.fieldAlignment" (ngModelChange)="rerender()">
                            @for (v of ['top', 'center', 'bottom']; track v) { <mat-option [value]="v">{{ v }}</mat-option> }
                        </mat-select>
                    </mat-form-field>
                </div>

                <h3 class="mat-title-small">Data groups <code>&lt;dataGroup&gt;</code></h3>
                <div class="row">
                    <mat-form-field>
                        <mat-label>Layout</mat-label>
                        <mat-select [(ngModel)]="layout.type" (ngModelChange)="rerender()">
                            @for (v of ['grid', 'flow', 'legacy']; track v) { <mat-option [value]="v">{{ v }}</mat-option> }
                        </mat-select>
                    </mat-form-field>
                    <mat-form-field>
                        <mat-label>Alignment</mat-label>
                        <mat-select [(ngModel)]="layout.alignment" (ngModelChange)="rerender()">
                            @for (v of ['start', 'center', 'end']; track v) { <mat-option [value]="v">{{ v }}</mat-option> }
                        </mat-select>
                        <mat-hint>of not full rows (flow, legacy)</mat-hint>
                    </mat-form-field>
                    <mat-form-field>
                        <mat-label>Compact direction</mat-label>
                        <mat-select [(ngModel)]="layout.compactDirection" (ngModelChange)="rerender()">
                            @for (v of ['none', 'up']; track v) { <mat-option [value]="v">{{ v }}</mat-option> }
                        </mat-select>
                    </mat-form-field>
                    <mat-form-field>
                        <mat-label>Hide empty rows</mat-label>
                        <mat-select [(ngModel)]="layout.hideEmptyRows" (ngModelChange)="rerender()">
                            @for (v of ['none', 'all', 'compacted']; track v) { <mat-option [value]="v">{{ v }}</mat-option> }
                        </mat-select>
                    </mat-form-field>
                </div>
                <mat-slide-toggle [(ngModel)]="layout.stretch" (ngModelChange)="rerender()">Stretch (fields of a not full row fill it)</mat-slide-toggle>

                <h3 class="mat-title-small">Fields <code>&lt;dataRef&gt;&lt;layout&gt;</code></h3>
                <div class="row">
                    <mat-form-field>
                        <mat-label>Template</mat-label>
                        <mat-select [(ngModel)]="layout.template" (ngModelChange)="rerender()">
                            @for (v of ['material', 'netgrif']; track v) { <mat-option [value]="v">{{ v }}</mat-option> }
                        </mat-select>
                        <mat-hint>netgrif = title next to the field</mat-hint>
                    </mat-form-field>
                </div>
                <button mat-button (click)="reset()"><mat-icon>restart_alt</mat-icon> Reset</button>
                <p class="mat-body-small">The task is assigned automatically when it opens. Finishing it shows the next state of the
                    case: the task disappears.</p>
            </div>
        </ne-demo-page>`,
    styles: [`.single-task-config h3 { margin: 16px 0 4px; color: var(--mat-sys-on-surface-variant); }
        .single-task-config .row { display: flex; flex-wrap: wrap; gap: 8px; }
        .single-task-config .row mat-form-field { flex: 1 1 180px; }
        .density-frame { height: 100%; }`],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class SingleTaskDemoComponent {
    readonly description = 'One task with its form and action buttons, without a task list, e.g. a form opened from a link. '
        + 'The layout settings change the task form the way the Petriflow layout does.';

    /** open tasks of the initial cases of the mock engine (`mock-data.ts`) */
    readonly options = [
        {label: 'Lost luggage – Register claim', task: {caseId: 'claim-luggage', transitionId: 'register'}},
        {label: 'Long texts (edge case) – Register claim', task: {caseId: 'claim-long-title', transitionId: 'register'}},
        {label: 'Word without spaces (edge case) – Assess claim', task: {caseId: 'claim-long-word', transitionId: 'assess'}},
        {label: 'Broken windshield – Assess claim', task: {caseId: 'claim-windshield', transitionId: 'assess'}},
        {label: 'Flooded kitchen – Pay out', task: {caseId: 'claim-kitchen', transitionId: 'pay'}},
        {label: 'Doctor visit – Request leave', task: {caseId: 'leave-doctor', transitionId: 'request'}},
    ];
    selected = this.options[0].task;
    /** Material 3 density of the form, null = task form density of the theme */
    density: number | null = null;
    readonly densities = [0, -1, -2, -3, -4, -5];
    /** the mock engine reads it when the task data are loaded */
    readonly layout = FORM_LAYOUT;
    renderKey = 0;

    rerender(): void {
        this.renderKey++;
    }

    reset(): void {
        Object.assign(FORM_LAYOUT, DEFAULT_FORM_LAYOUT);
        this.density = null;
        this.rerender();
    }

    get snippets(): Array<CodeSnippet> {
        const l = this.layout;
        return [{
            label: 'Petriflow',
            code: `<transition>
    <id>register</id>
    <layout>
        <cols>${l.cols}</cols>
        <fieldAlignment>${l.fieldAlignment}</fieldAlignment>
    </layout>
    <dataGroup>
        <id>incident</id>
        <cols>${l.cols}</cols>
        <layout>${l.type}</layout>
        <alignment>${l.alignment}</alignment>
        <stretch>${l.stretch}</stretch>
        <compactDirection>${l.compactDirection}</compactDirection>
        <hideEmptyRows>${l.hideEmptyRows}</hideEmptyRows>
        <dataRef>
            <id>client</id>
            <layout>
                <x>0</x><y>0</y><rows>1</rows><cols>2</cols>
                <template>${l.template}</template>
            </layout>
        </dataRef>
    </dataGroup>
</transition>`,
        }, {
            label: 'SCSS',
            code: this.density === null
                ? `// task forms follow the density of the page (the appearance dialog), the default of the theme
@include nae.theme();`
                : `// all task forms of the application
@include nae.theme($task-form-density: ${this.density}, $task-form-field-density: null);

// or the forms of one view only
.my-view nc-task-content {
    @include mat.theme((density: ${this.density}));
}`,
        }, {
            label: 'TypeScript',
            code: `@Component({
    selector: 'app-single-task-view',
    template: \`<nc-single-task [task$]="task$" [loading$]="loading$" [selectedHeaders$]="selectedHeaders$"
                                [hideActionRow]="false" [actionButtonTemplates]="[finishButton]"></nc-single-task>
               <ng-template #finishButton let-finish="finish">
                   <button mat-flat-button (click)="finish()">Finish</button>
               </ng-template>\`,
    providers: [
        CategoryFactory, TaskViewService, SearchService, ChangedFieldsService, ViewIdService,
        TaskDataService, FrontActionService, FinishTaskService, TaskRequestStateService, TaskEventService,
        {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'single-task'},
        {provide: NAE_BASE_FILTER, useValue: {filter: SimpleFilter.fromTaskQuery({case: {id: caseId}, transitionId: 'register'})}},
        {provide: AllowedNetsService, useFactory: (f: AllowedNetsServiceFactory) => f.createFromArray(['insurance_claim']),
            deps: [AllowedNetsServiceFactory]},
    ],
})
export class SingleTaskViewComponent extends AbstractSingleTaskViewComponent {
    constructor(taskViewService: TaskViewService, activatedRoute: ActivatedRoute) {
        super(taskViewService, activatedRoute);
    }
}`,
        }];
    }
}
