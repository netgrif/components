import {TestBed} from '@angular/core/testing';
import {AssignTaskService} from './assign-task.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateModule} from '@ngx-translate/core';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {TaskRequestStateService} from './task-request-state.service';
import {TaskDataService} from './task-data.service';
import {DataFocusPolicyService} from './data-focus-policy.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {NullTaskOperations} from '../models/null-task-operations';
import {Observable, of, throwError} from 'rxjs';
import {EventOutcomeMessageResource} from '../../resources/interface/message-resource';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {SingleTaskContentService} from '../../task-content/services/single-task-content.service';
import {Task} from '../../resources/public-api';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../task-content/model/policy';
import {CallChainService} from '../../utility/call-chain/call-chain.service';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';
import {map} from 'rxjs/operators';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {TaskEventNotification} from '../../task-content/model/task-event-notification';
import {TaskEvent} from '../../task-content/model/task-event';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {createMockCase} from '../../utility/tests/utility/create-mock-case';
import {createMockNet} from '../../utility/tests/utility/create-mock-net';
import {ChangedFieldsService} from '../../changed-fields/services/changed-fields.service';
import {AssignTaskEventOutcome} from '../../event/model/event-outcomes/task-outcomes/assign-task-event-outcome';
import {createMockTask} from '../../utility/tests/utility/create-mock-task';
import {createMockTaskOutcome} from '../../utility/tests/utility/create-mock-task-outcome';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';

describe('AssignTaskService', () => {
    let service: AssignTaskService;
    let testTask: Task;
    let resourceService: TestTaskResourceService;
    let callChainService: CallChainService;
    let taskEventService: TaskEventService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateModule,
                TranslateLibModule,
                NoopAnimationsModule,
                SnackBarModule
            ],
            providers: [
                AssignTaskService,
                TaskRequestStateService,
                TaskDataService,
                DataFocusPolicyService,
                TaskEventService,
                ChangedFieldsService,
                {provide: TaskContentService, useClass: SingleTaskContentService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_TASK_OPERATIONS, useClass: NullTaskOperations},
                {provide: TaskResourceService, useClass: TestTaskResourceService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                ]
            }
        }).compileComponents();
        service = TestBed.inject(AssignTaskService);
        testTask = {
            caseId: '',
            transitionId: '',
            title: '',
            caseColor: '',
            caseTitle: '',
            user: undefined,
            userRefs: undefined,
            roles: {},
            startDate: [1],
            finishDate: [1],
            assignPolicy: AssignPolicy.MANUAL,
            dataFocusPolicy: DataFocusPolicy.MANUAL,
            finishPolicy: FinishPolicy.MANUAL,
            stringId: 'taskId',
            layout: {rows: 1, cols: 1, offset: 0},
            dataGroups: [],
            users: {},
            _links: {}
        };
        TestBed.inject(TaskContentService).task = testTask;
        resourceService = TestBed.inject(TaskResourceService) as unknown as TestTaskResourceService;
        callChainService = TestBed.inject(CallChainService);
        taskEventService = TestBed.inject(TaskEventService);
        spyOn(console, 'debug');
        spyOn(TestBed.inject(SnackBarService), 'openErrorSnackBar');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should assign successfully', done => {
        expect(testTask.startDate).toBeTruthy();
        const mockCase = createMockCase();
        const mockNet = createMockNet();
        resourceService.response = {
            success: 'success',
            outcome: {
                message: '',
                aCase: mockCase,
                net: mockNet,
                task: {
                    caseId: '',
                    transitionId: '',
                    title: '',
                    caseColor: '',
                    caseTitle: '',
                    user: null,
                    roles: {
                        role: 'perform'
                    },
                    startDate: null,
                    finishDate: null,
                    assignPolicy: AssignPolicy.MANUAL,
                    dataFocusPolicy: DataFocusPolicy.MANUAL,
                    finishPolicy: FinishPolicy.MANUAL,
                    stringId: 'taskId',
                    layout: {rows: 1, cols: 1, offset: 0},
                    dataGroups: [],
                    _links: {}
                },
            },
            outcomes: []
        } as EventOutcomeMessageResource;

        let taskEvent: TaskEventNotification;
        taskEventService.taskEventNotifications$.subscribe(event => {
            taskEvent = event;
        });

        service.assign(callChainService.create((result) => {
            expect(result).toBeTrue();
            expect(testTask.startDate).toBeFalsy();

            expect(taskEvent).toBeTruthy();
            expect(taskEvent.taskId).toEqual('taskId');
            expect(taskEvent.success).toBeTrue();
            expect(taskEvent.event).toEqual(TaskEvent.ASSIGN);

            done();
        }));
    });

    it('should assign unsuccessful', done => {
        expect(testTask.startDate).toBeTruthy();
        resourceService.response = {
            error: 'error',
        };

        let taskEvent: TaskEventNotification;
        taskEventService.taskEventNotifications$.subscribe(event => {
            taskEvent = event;
        });

        service.assign(callChainService.create((result) => {
            expect(result).toBeFalse();
            expect(testTask.startDate).toBeTruthy();

            expect(taskEvent).toBeTruthy();
            expect(taskEvent.taskId).toEqual('taskId');
            expect(taskEvent.success).toBeFalse();
            expect(taskEvent.event).toEqual(TaskEvent.ASSIGN);

            done();
        }));
    });

    it('should assign error', done => {
        expect(testTask.startDate).toBeTruthy();
        resourceService.response = {error: 'throw'};

        let taskEvent: TaskEventNotification;
        taskEventService.taskEventNotifications$.subscribe(event => {
            taskEvent = event;
        });

        service.assign(callChainService.create((result) => {
            expect(result).toBeFalse();
            expect(testTask.startDate).toBeTruthy();

            expect(taskEvent).toBeTruthy();
            expect(taskEvent.taskId).toEqual('taskId');
            expect(taskEvent.success).toBeFalse();
            expect(taskEvent.event).toEqual(TaskEvent.ASSIGN);

            done();
        }));
    });

// NAE-1395
    it('should trigger AfterAction on assigned task', done => {
        expect(testTask.startDate).toBeTruthy();
        resourceService.response = {
            success: 'success',
            outcome: createMockTaskOutcome(createMockTask()) as AssignTaskEventOutcome
        };

        let taskEvent: TaskEventNotification;
        taskEventService.taskEventNotifications$.subscribe(event => {
            taskEvent = event;
        });

        service.assign(callChainService.create((resultCall1) => {
            expect(resultCall1).toBeTrue();
            expect(testTask.startDate).toBeFalsy();

            expect(taskEvent).toBeTruthy();
            expect(taskEvent.taskId).toEqual('taskId');
            expect(taskEvent.success).toBeTrue();
            expect(taskEvent.event).toEqual(TaskEvent.ASSIGN);

            service.assign(callChainService.create((resultCall2) => {
                expect(resultCall2).toBeTrue();
                done();
            }));
        }));
    });
});

class TestTaskResourceService {

    public response: EventOutcomeMessageResource;

    public assignTask(): Observable<EventOutcomeMessageResource> {
        if (this.response.error === 'throw') {
            return of(this.response).pipe(map(r => {
                throw throwError(r);
            }));
        }

        if (this.response.error !== undefined) {
            return of({
                ...this.response
            });
        }

        return of({
            ...this.response,
        });
    }
}
