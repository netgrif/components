import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {AfterViewInit, Component, Inject, Injector, NO_ERRORS_SCHEMA, ViewChild} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of, Subject, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AbstractTaskPanelComponent} from './abstract-task-panel.component';
import {SubjectTaskOperations} from '../../task/models/subject-task-operations';
import {NAE_TASK_OPERATIONS} from '../../task/models/task-operations-injection-token';
import {CallChainService} from '../../utility/call-chain/call-chain.service';
import {AssignPolicyService} from '../../task/services/assign-policy.service';
import {TaskDataService} from '../../task/services/task-data.service';
import {TaskRequestStateService} from '../../task/services/task-request-state.service';
import {FinishTaskService} from '../../task/services/finish-task.service';
import {CancelTaskService} from '../../task/services/cancel-task.service';
import {DelegateTaskService} from '../../task/services/delegate-task.service';
import {AssignTaskService} from '../../task/services/assign-task.service';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {SearchService} from '../../search/search-service/search.service';
import {TestTaskBaseFilterProvider, TestTaskViewAllowedNetsFactory} from '../../utility/tests/test-factory-methods';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {TaskPanelData} from '../task-panel-list/task-panel-data/task-panel-data';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../task-content/model/policy';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {TaskMetaField} from '../../header/task-header/task-meta-enum';
import {FinishPolicyService} from '../../task/services/finish-policy.service';
import {DataFocusPolicyService} from '../../task/services/data-focus-policy.service';
import {SingleTaskContentService} from '../../task-content/services/single-task-content.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';
import {TranslateService} from '@ngx-translate/core';
import {NAE_BASE_FILTER} from '../../search/models/base-filter-injection-token';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';
import {UserService} from '../../user/services/user.service';

describe('AbtsractTaskPanelComponent', () => {
    let component: TestTaskPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let assignSpy: jasmine.Spy;

    beforeEach(waitForAsync(() => {
        const mockAssignPolicyService = {
            performAssignPolicy: () => {}
        };

        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                MaterialModule,
                NoopAnimationsModule,
                CommonModule,
                TranslateLibModule,
                HttpClientTestingModule,
                SnackBarModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                TaskViewService,
                SideMenuService,
                CurrencyPipe,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: TaskResourceService, useClass: MyTaskResources},
                {provide: UserResourceService, useClass: MockUserResourceService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestTaskBaseFilterProvider
                },
                {provide: TaskContentService, useClass: SingleTaskContentService},
                TaskDataService,
                TaskEventService,
                AssignTaskService,
                DelegateTaskService,
                CancelTaskService,
                FinishTaskService,
                TaskRequestStateService,
                DataFocusPolicyService,
                AssignPolicyService,
                FinishPolicyService,
                {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
                {provide: AllowedNetsService, useFactory: TestTaskViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ],
            declarations: [
                TestTaskPanelComponent,
                TestWrapperComponent,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
        }).overrideProvider(AssignPolicyService, {useValue: mockAssignPolicyService}
        ).compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();

        assignSpy = spyOn<any>(mockAssignPolicyService, 'performAssignPolicy');
        spyOn(console, 'info');
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should perform assign policy on panel open', () => {
        component.panelRef.open();
        expect(assignSpy).toHaveBeenCalled();
    });

    it('should process tasks', () => {
        component.taskPanelData.task.stringId = 'true';
        component.taskPanelData.task.startDate = [2020, 1, 1, 1, 1];
        component.assign();
        expect(component.taskPanelData.task.startDate).toBe(undefined);

        component.taskPanelData.task.stringId = 'true';
        component.taskPanelData.task.startDate = [2020, 1, 1, 1, 1];
        component.finish();
        expect(component.taskPanelData.task.startDate).toBe(undefined);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-task-panel',
    template: '<mat-expansion-panel #matExpansionPanel>' +
        '</mat-expansion-panel>'
})
class TestTaskPanelComponent extends AbstractTaskPanelComponent implements AfterViewInit {

    @ViewChild('matExpansionPanel') matExpansionPanel;

    constructor(protected _taskContentService: TaskContentService,
                protected _log: LoggerService,
                protected _taskViewService: TaskViewService,
                protected _paperView: PaperViewService,
                protected _taskEventService: TaskEventService,
                protected _assignTaskService: AssignTaskService,
                protected _delegateTaskService: DelegateTaskService,
                protected _cancelTaskService: CancelTaskService,
                protected _finishTaskService: FinishTaskService,
                protected _taskState: TaskRequestStateService,
                protected _taskDataService: TaskDataService,
                protected _assignPolicyService: AssignPolicyService,
                protected _callChain: CallChainService,
                protected _translate: TranslateService,
                @Inject(NAE_TASK_OPERATIONS) _taskOperations: SubjectTaskOperations,
                parentInjector: Injector,
                protected _currencyPipe: CurrencyPipe) {
        super(_taskContentService, _log, _taskViewService, _paperView, _taskEventService, _assignTaskService,
            _delegateTaskService, _cancelTaskService, _finishTaskService, _taskState, _taskDataService,
            _assignPolicyService, _callChain, _taskOperations, undefined, _translate, _currencyPipe);
    }

    ngAfterViewInit() {
        this.setPanelRef(this.matExpansionPanel);
        super.ngAfterViewInit();
    }

    protected createContentPortal(): void {
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-task-panel [taskPanelData]="taskPanel" [selectedHeaders$]="selectedHeaders$"></nae-test-task-panel>'
})
class TestWrapperComponent {
    taskPanel: TaskPanelData = {
        task: {
            caseId: 'string',
            transitionId: 'string',
            title: 'string',
            caseColor: 'string',
            caseTitle: 'string',
            user: undefined,
            roles: {},
            startDate: undefined,
            finishDate: undefined,
            assignPolicy: AssignPolicy.manual,
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.manual,
            stringId: 'string',
            layout: {
                offset: 0,
                cols: undefined,
                rows: undefined
            },
            dataGroups: [],
            _links: {}
        },
        changedFields: new Subject<ChangedFields>(),
        initiallyExpanded: false
    };
    selectedHeaders$ = of([
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.CASE, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.TITLE, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.PRIORITY, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, TaskMetaField.USER, 'string', 'string'),
    ]);
}

class MyTaskResources {

    getData(stringId) {
        return of([]);
    }

    setData(stringId) {
        return of({changedFields: {}});
    }

    assignTask(stringId) {
        if (stringId === 'true') {
            return of({success: 'Success'});
        } else if (stringId === 'false') {
            return of({error: 'error'});
        } else if (stringId === 'error') {
            return of({error: 'error'}).pipe(map(res => {
                throw throwError(res);
            }));
        }
    }

    finishTask(stringId) {
        if (stringId === 'true') {
            return of({success: 'Success'});
        } else if (stringId === 'false') {
            return of({error: 'error'});
        } else if (stringId === 'error') {
            return of({error: 'error'}).pipe(map(res => {
                throw throwError(res);
            }));
        }
    }

    searchTask(filter) {
        return of([{
            caseId: 'string',
            transitionId: 'string',
            title: 'string',
            caseColor: 'string',
            caseTitle: 'string',
            user: undefined,
            roles: {},
            startDate: undefined,
            finishDate: undefined,
            assignPolicy: AssignPolicy.manual,
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.manual,
            stringId: 'string',
            layout: {
                cols: undefined,
                rows: undefined
            },
            dataGroups: [],
            _links: {}
        }]);
    }
}
