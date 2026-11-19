import {ChangeDetectionStrategy, Component, Injector} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {Observable, timer} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {
    FilterRepository,
    FilterSelectorInjectionData,
    FilterType,
    NewCaseCreationConfigurationData,
    ProcessService,
    SessionIdleTimerService,
    SimpleFilter,
    UserImpersonateInjectionData,
    TaskViewDialogInjectionData,
    UserListInjectedData,
    UserListValue,
    UserValue,
} from '@netgrif/components-core';
import {
    AdminImpersonateDialogComponent,
    AppearanceDialogComponent,
    FilterSelectorDialogComponent,
    ImportNetDialogComponent,
    MultiUserAssignDialogComponent,
    NewCaseDialogComponent,
    PopupSessionIdleComponent,
    SingleTaskViewDialogComponent,
    TaskViewDialogComponent,
    UserAssignDialogComponent,
    UserImpersonateDialogComponent,
} from '@netgrif/components';
import {CodeSnippet} from '../../playground/code-block/code-block.component';
import {DIALOG_DEMOS, DialogDemo} from './dialog-demos';

/** a dialog opened by the demo: the call of the library and its code */
interface OpenedDialog {
    ref: MatDialogRef<unknown>;
}

/**
 * One dialog of the libraries (`dialogs/:id`, {@link DIALOG_DEMOS}): opens it with the same component, config and data as
 * the library, shows the result of `afterClosed()`. Density and long texts are applied through the config of the dialog
 * (dialogs are rendered in the overlay container, not inside the preview).
 */
@Component({
    selector: 'ne-dialogs-demo',
    templateUrl: './dialogs-demo.component.html',
    styleUrls: ['./dialogs-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class DialogsDemoComponent {
    readonly demo$: Observable<DialogDemo>;

    /** Material 3 density of the dialog (`ne-density-*` classes of the playground styles on the overlay pane) */
    density = 0;
    readonly densities = [0, -1, -2, -3, -4, -5];
    /** long case titles / names where the dialog shows them */
    longTexts = false;

    // new case
    enableCaseTitle = true;
    isCaseTitleRequired = true;
    bothProcesses = true;
    // task view dialogs
    autoCloseOnEvent = false;
    // filter selector
    filterType: 'all' | 'case' | 'task' = 'all';

    /** results of `afterClosed()`, newest first */
    events: Array<{ name: string, value: string }> = [];

    constructor(route: ActivatedRoute, private _dialog: MatDialog, private _processService: ProcessService,
                private _filterRepository: FilterRepository, private _injector: Injector) {
        this.demo$ = route.paramMap.pipe(map(params => {
            this.events = [];
            return DIALOG_DEMOS.find(d => d.id === params.get('id')) ?? DIALOG_DEMOS[0];
        }));
    }

    open(demo: DialogDemo): void {
        const opened = this.openDialog(demo);
        opened.ref.afterClosed().subscribe(result => this.log('afterClosed', result));
    }

    /** the panel class of the library plus the density of the demo */
    private panelClass(libraryClass?: string): Array<string> {
        return [libraryClass, 'ne-density-' + -this.density].filter(c => !!c);
    }

    private openDialog(demo: DialogDemo): OpenedDialog {
        const config = (c: MatDialogConfig): MatDialogConfig => ({...c, panelClass: this.panelClass(c.panelClass as string)});
        switch (demo.id) {
            case 'user-assign':
                return {ref: this._dialog.open(UserAssignDialogComponent, config({
                    panelClass: 'dialog-responsive',
                    data: {roles: [], value: this.currentUser()} as UserListInjectedData,
                }))};
            case 'multi-user-assign':
                return {ref: this._dialog.open(MultiUserAssignDialogComponent, config({
                    panelClass: 'dialog-responsive',
                    data: {roles: [], value: new UserListValue(new Map([['playground-user', this.currentUser()]]))} as UserListInjectedData,
                }))};
            case 'new-case':
                return {ref: this._dialog.open(NewCaseDialogComponent, config({
                    panelClass: 'dialog-responsive',
                    data: {
                        allowedNets$: this._processService.getNets(this.bothProcesses ? ['insurance_claim', 'leave_request'] : ['insurance_claim']),
                        newCaseCreationConfiguration: {
                            enableCaseTitle: this.enableCaseTitle,
                            isCaseTitleRequired: this.isCaseTitleRequired,
                        } as NewCaseCreationConfigurationData,
                    },
                }))};
            case 'task-view':
                return {ref: this._dialog.open(TaskViewDialogComponent, config({
                    panelClass: 'dialog-task-responsive',
                    data: {autoCloseOnEvent: this.autoCloseOnEvent, searchBody: {case: {id: this.caseId()}}} as TaskViewDialogInjectionData,
                }))};
            case 'single-task-view':
                return {ref: this._dialog.open(SingleTaskViewDialogComponent, config({
                    panelClass: 'dialog-task-responsive',
                    data: {
                        autoCloseOnEvent: this.autoCloseOnEvent,
                        searchBody: {transitionId: 'register', case: {id: this.caseId()}},
                    } as TaskViewDialogInjectionData,
                }))};
            case 'filter-selector':
                this.saveDemoFilters();
                return {ref: this._dialog.open(FilterSelectorDialogComponent, config({
                    panelClass: 'dialog-responsive',
                    data: this.filterSelectorData(),
                }))};
            case 'user-impersonate':
                // the same filter as ImpersonationUserSelectService (configs of the logged user, active and valid now)
                return {ref: this._dialog.open(UserImpersonateDialogComponent, config({
                    panelClass: 'dialog-task-responsive',
                    data: {filter: SimpleFilter.fromCaseQuery({
                        process: {identifier: 'impersonation_config'},
                        query: '(dataSet.impersonators.keyValue:playground-user) AND (dataSet.is_active.booleanValue:true)',
                    })} as UserImpersonateInjectionData,
                }))};
            case 'admin-impersonate':
                return {ref: this._dialog.open(AdminImpersonateDialogComponent, config({
                    panelClass: 'dialog-responsive',
                    data: {} as UserListInjectedData,
                }))};
            case 'session-idle':
                // the session timeout is off in the playground: the dialog gets a timer counting down from 60 seconds
                return {ref: this._dialog.open(PopupSessionIdleComponent, config({
                    injector: Injector.create({
                        providers: [{provide: SessionIdleTimerService, useValue: {
                            remainSeconds$: timer(0, 1000).pipe(map(i => 60 - i), takeWhile(seconds => seconds >= 0)),
                        }}],
                        parent: this._injector,
                    }),
                }))};
            case 'import-net':
                return {ref: this._dialog.open(ImportNetDialogComponent, config({panelClass: 'dialog-responsive'}))};
            default:
                return {ref: this._dialog.open(AppearanceDialogComponent, config({width: '560px'}))};
        }
    }

    private filterSelectorData(): FilterSelectorInjectionData {
        return this.filterType === 'all' ? {} : {filterTypeConstraint: this.filterType === 'case' ? FilterType.CASE : FilterType.TASK};
    }

    /** saved filters of the demo in the filter repository of the application (a filter with a very long title) */
    private saveDemoFilters(): void {
        [
            new SimpleFilter('demo-claims', FilterType.CASE, {process: {identifier: 'insurance_claim'}}, 'Insurance claims'),
            new SimpleFilter('demo-leaves', FilterType.CASE, {process: {identifier: 'leave_request'}}, 'Leave requests'),
            new SimpleFilter('demo-long', FilterType.CASE, {process: {identifier: 'insurance_claim'}},
                'Claims of the clients of the branch office with the damage above the limit of the regional manager'),
            new SimpleFilter('demo-my-tasks', FilterType.TASK, {user: {}} as any, 'My tasks'),
            new SimpleFilter('demo-assess', FilterType.TASK, {transitionId: 'assess'}, 'Claims to assess'),
        ].forEach(filter => this._filterRepository.saveFilter(filter));
    }

    /** a case of the mock engine, with a very long title for the long texts */
    private caseId(): string {
        return this.longTexts ? 'claim-long-title' : 'claim-luggage';
    }

    private currentUser(): UserValue {
        return new UserValue('playground-user', 'Jane', 'Doe', 'jane.doe@netgrif.com');
    }

    log(name: string, value?: any): void {
        let text = '';
        if (value !== undefined) {
            try {
                text = JSON.stringify(value, (key, v) => (key === 'net' && v ? '[Net]' : v));
            } catch {
                text = String(value);
            }
        }
        this.events = [{name, value: text.length > 400 ? text.slice(0, 400) + '…' : text}, ...this.events].slice(0, 8);
    }

    snippets(demo: DialogDemo): Array<CodeSnippet> {
        const open = (component: string, cfg: string) => `this._dialog.open(${component}, ${cfg})\n    .afterClosed().subscribe(result => console.log(result));`;
        const head = `import {MatDialog} from '@angular/material/dialog';\n\nconstructor(private _dialog: MatDialog) {}\n\n`;
        switch (demo.id) {
            case 'user-assign':
                return [{label: 'TypeScript', code: head + `// the user field does the same (AbstractUserDefaultFieldComponent.selectAbstractUser)\n`
                        + open('UserAssignDialogComponent', `{\n    panelClass: 'dialog-responsive',\n    data: {roles: [], value: currentUser} as UserListInjectedData,\n}`)
                        + `\n// result: {data: UserValue} or undefined`}];
            case 'multi-user-assign':
                return [{label: 'TypeScript', code: head
                        + open('MultiUserAssignDialogComponent', `{\n    panelClass: 'dialog-responsive',\n    data: {roles: [], value: new UserListValue(users)} as UserListInjectedData,\n}`)}];
            case 'new-case':
                return [{label: 'TypeScript', code: `// usually through the case view: CaseViewService.createNewCase(config)\n` + head
                        + open('NewCaseDialogComponent', `{\n    panelClass: 'dialog-responsive',\n    data: {\n`
                            + `        allowedNets$: processService.getNets(['insurance_claim', 'leave_request']),\n`
                            + `        newCaseCreationConfiguration: {enableCaseTitle: ${this.enableCaseTitle}, isCaseTitleRequired: ${this.isCaseTitleRequired}},\n    },\n}`)}];
            case 'task-view':
            case 'single-task-view': {
                const component = demo.id === 'task-view' ? 'TaskViewDialogComponent' : 'SingleTaskViewDialogComponent';
                const search = demo.id === 'task-view' ? `{case: {id: caseId}}` : `{transitionId: 'register', case: {id: caseId}}`;
                return [{label: 'TypeScript', code: head + open(component, `{\n    panelClass: 'dialog-task-responsive',\n    data: {autoCloseOnEvent: ${this.autoCloseOnEvent}, searchBody: ${search}} as TaskViewDialogInjectionData,\n}`)}];
            }
            case 'filter-selector':
                return [{label: 'TypeScript', code: `// filters saved in the FilterRepository of the application (filterRepository.saveFilter)\n` + head
                        + open('FilterSelectorDialogComponent', `{\n    panelClass: 'dialog-responsive',\n    data: {filterTypeConstraint: FilterType.CASE} as FilterSelectorInjectionData,   // optional\n}`)
                        + `\n// result: {data: Filter}`}];
            case 'user-impersonate':
                return [{label: 'TypeScript', code: `// usually: impersonationUserSelectService.selectImpersonate() (user without the admin role)\n` + head
                        + open('UserImpersonateDialogComponent', `{\n    panelClass: 'dialog-task-responsive',\n    data: {filter: SimpleFilter.fromCaseQuery({process: {identifier: 'impersonation_config'}, query})},\n}`)
                        + `\n// result: {data: UserImpersonateConfigMetadata}, then impersonationService.impersonateByConfig(stringId)`}];
            case 'admin-impersonate':
                return [{label: 'TypeScript', code: `// usually: impersonationUserSelectService.selectImpersonate() (admin)\n` + head
                        + open('AdminImpersonateDialogComponent', `{panelClass: 'dialog-responsive', data: {}}`)
                        + `\n// result: {data: UserValue}, then impersonationService.impersonateUser(user._id)`}];
            case 'session-idle':
                return [{label: 'HTML', code: `<!-- in the app component: opens the dialog when the session of an idle user is about to expire -->\n<nc-session-idle></nc-session-idle>`},
                    {label: 'nae.json', code: `"providers": {"auth": {"sessionTimeoutEnabled": true, "sessionTimeout": 900}}`}];
            case 'import-net':
                return [{label: 'TypeScript', code: `// the workflow view does the same (AbstractWorkflowViewComponent.importSidemenuNet)\n` + head
                        + open('ImportNetDialogComponent', `{panelClass: 'dialog-responsive'}`)}];
            default:
                return [{label: 'TypeScript', code: `// the account menu of nc-navigation-double-drawer does the same\n` + head
                        + open('AppearanceDialogComponent', `{width: '560px'}`)}];
        }
    }
}
