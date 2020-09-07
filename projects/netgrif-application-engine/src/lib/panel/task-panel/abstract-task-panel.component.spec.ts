import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import {PanelModule} from '../panel.module';
import {CommonModule} from '@angular/common';
import {Component, Inject, Injector, StaticProvider} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Observable, of, Subject, throwError} from 'rxjs';
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
import {
    ArrayTaskViewServiceFactory,
    noNetsTaskViewServiceFactory
} from '../../view/task-view/service/factory/array-task-view-service-factory';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {NullAuthenticationService} from '../../authentication/services/methods/null-authentication/null-authentication.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {SearchService} from '../../search/search-service/search.service';
import {TestTaskSearchServiceFactory} from '../../utility/tests/test-factory-methods';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {TaskPanelData} from '../task-panel-list/task-panel-data/task-panel-data';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../task-content/model/policy';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {TaskMetaField} from '../../header/task-header/task-meta-enum';

describe('AbtsractTaskPanelComponent', () => {
    let component: TestTaskPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let assignSpy: jasmine.Spy;

    beforeEach(async(() => {
        const mockAssignPolicyService = {
            performAssignPolicy: () => {}
        };

        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                PanelModule,
                MaterialModule,
                NoopAnimationsModule,
                CommonModule,
                TranslateLibModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                ArrayTaskViewServiceFactory,
                SideMenuService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: NullAuthenticationService},
                {
                    provide: TaskViewService,
                    useFactory: noNetsTaskViewServiceFactory,
                    deps: [ArrayTaskViewServiceFactory]
                },
                {provide: TaskResourceService, useClass: MyResources},
                {provide: UserResourceService, useClass: MyUserResources},
                {provide: SearchService, useFactory: TestTaskSearchServiceFactory},
                TaskContentService,
                TaskEventService,
            ],
            declarations: [
                TestTaskPanelComponent,
                TestWrapperComponent,
            ]
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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-task-panel',
    template: ''
})
class TestTaskPanelComponent extends AbstractTaskPanelComponent {
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
                @Inject(NAE_TASK_OPERATIONS) _taskOperations: SubjectTaskOperations) {
        super(_taskContentService, _log, _taskViewService, _paperView, _taskEventService, _assignTaskService,
            _delegateTaskService, _cancelTaskService, _finishTaskService, _taskState, _taskDataService,
            _assignPolicyService, _callChain, _taskOperations);
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

class MyResources {

    getData(stringId) {
        return of([{
            fields: {
                _embedded: {
                    localisedNumberFields: [{
                        stringId: 'number',
                        type: 'number',
                        name: 'Number',
                        description: 'Number field description',
                        placeholder: 'Number field placeholder',
                        behavior: {
                            editable: true
                        },
                        value: 10.0,
                        order: 0,
                        validations: [{
                            validationRule: 'inrange 0,inf'
                        }, {
                            validationRule: 'inrange 0,inf',
                            validationMessage: 'Number field validation message'
                        }],
                        defaultValue: 10.0,
                        layout: {
                            x: 1,
                            y: 1,
                            cols: 1,
                            rows: 1
                        }
                    }]
                }
            },
            alignment: 'start',
            stretch: true,
            layout: {
                row: 2,
                cols: 2
            }
        }]);
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

class MyUserResources {
    getLoggedUser(params): Observable<any> {
        return of({
            id: '5',
            email: 'string',
            name: 'string',
            surname: 'string',
            fullName: 'string',
            groups: [],
            authorities: [],
            processRoles: [],
            _links: {},
        });
    }
}
