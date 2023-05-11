import {TestBed} from '@angular/core/testing';
import {FinishTaskService} from './finish-task.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {TranslateModule} from '@ngx-translate/core';
import {TaskRequestStateService} from './task-request-state.service';
import {TaskDataService} from './task-data.service';
import {DataFocusPolicyService} from './data-focus-policy.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {NullTaskOperations} from '../models/null-task-operations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {EventOutcomeMessageResource} from '../../resources/interface/message-resource';
import {Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../task-content/model/policy';
import {Task} from '../../resources/interface/task';
import {CallChainService} from '../../utility/call-chain/call-chain.service';
import {DataGroup} from '../../resources/interface/data-groups';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';
import {UnlimitedTaskContentService} from '../../task-content/services/unlimited-task-content.service';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {TaskEventNotification} from '../../task-content/model/task-event-notification';
import {TaskEvent} from '../../task-content/model/task-event';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AssignTaskEventOutcome} from '../../event/model/event-outcomes/task-outcomes/assign-task-event-outcome';
import {createMockCase} from '../../utility/tests/utility/create-mock-case';
import {createMockNet} from '../../utility/tests/utility/create-mock-net';
import {ChangedFieldsService} from '../../changed-fields/services/changed-fields.service';

describe('FinishTaskService', () => {
    let service: FinishTaskService;
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
                FinishTaskService,
                TaskRequestStateService,
                TaskDataService,
                DataFocusPolicyService,
                TaskEventService,
                ChangedFieldsService,
                {provide: TaskContentService, useClass: UnlimitedTaskContentService},
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
        service = TestBed.inject(FinishTaskService);
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
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.MANUAL,
            stringId: 'taskId',
            layout: {rows: 1, cols: 1, offset: 0},
            dataGroups: [],
            dataSize: 0,
            users: {},
            _links: {}
        };
        TestBed.inject(TaskContentService).task = testTask;
        resourceService = TestBed.inject(TaskResourceService) as unknown as TestTaskResourceService;
        callChainService = TestBed.inject(CallChainService);
        taskEventService = TestBed.inject(TaskEventService);
        spyOn(console, 'debug');
        spyOn(console, 'info');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should finish successfully', done => {
        expect(testTask.startDate).toBeTruthy();
        resourceService.response = {
            success: 'success',
            outcome: {
                message: '',
                outcomes: [],
                task: {
                    caseId: '',
                    transitionId: '',
                    title: '',
                    caseColor: '',
                    caseTitle: '',
                    user: null,
                    roles: {
                        role: {
                            assign: true,
                            cancel: true,
                            finish: true,
                            set: true,
                            view: true
                        }
                    },
                    startDate: null,
                    finishDate: null,
                    assignPolicy: AssignPolicy.MANUAL,
                    dataFocusPolicy: DataFocusPolicy.manual,
                    finishPolicy: FinishPolicy.MANUAL,
                    stringId: 'taskId',
                    layout: {rows: 1, cols: 1, offset: 0},
                    dataGroups: [],
                    _links: {},
                    users: {},
                    userRefs: {}
                },
                case: createMockCase(),
                net: createMockNet()
            } as AssignTaskEventOutcome
        };

        let taskEvent: TaskEventNotification;
        taskEventService.taskEventNotifications$.subscribe(event => {
            taskEvent = event;
        });

        service.validateDataAndFinish(callChainService.create((result) => {
            expect(result).toBeTrue();
            expect(testTask.startDate).toBeFalsy();
            expect(testTask.finishDate).toBeFalsy();

            expect(taskEvent).toBeTruthy();
            expect(taskEvent.taskId).toEqual('taskId');
            expect(taskEvent.success).toBeTrue();
            expect(taskEvent.event).toEqual(TaskEvent.FINISH);

            done();
        }));
    });

    it('should finish unsuccessful', done => {
        expect(testTask.startDate).toBeTruthy();
        resourceService.response = {
            error: 'error',
            outcome: {}
        };

        let taskEvent: TaskEventNotification;
        taskEventService.taskEventNotifications$.subscribe(event => {
            taskEvent = event;
        });

        service.validateDataAndFinish(callChainService.create((result) => {
            expect(testTask.startDate).toBeTruthy();
            expect(result).toBeFalse();

            expect(taskEvent).toBeTruthy();
            expect(taskEvent.taskId).toEqual('taskId');
            expect(taskEvent.success).toBeFalse();
            expect(taskEvent.event).toEqual(TaskEvent.FINISH);

            done();
        }));
    });

    it('should finish error', done => {
        expect(testTask.startDate).toBeTruthy();
        resourceService.response = {error: 'throw'};

        let taskEvent: TaskEventNotification;
        taskEventService.taskEventNotifications$.subscribe(event => {
            taskEvent = event;
        });

        service.validateDataAndFinish(callChainService.create((result) => {
            expect(testTask.startDate).toBeTruthy();
            expect(result).toBeFalse();

            expect(taskEvent).toBeTruthy();
            expect(taskEvent.taskId).toEqual('taskId');
            expect(taskEvent.success).toBeFalse();
            expect(taskEvent.event).toEqual(TaskEvent.FINISH);

            done();
        }));
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

class TestTaskResourceService {

    public response: EventOutcomeMessageResource;

    public finishTask(): Observable<EventOutcomeMessageResource> {
        if (this.response.error === 'throw') {
            return of(this.response).pipe(map(r => {
                throw throwError(r);
            }));
        }
        return of(this.response);
    }

    public getData(): Observable<Array<DataGroup>> {
        return of([]);
    }
}
