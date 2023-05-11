import {TestBed} from '@angular/core/testing';
import {CancelTaskService} from './cancel-task.service';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskRequestStateService} from './task-request-state.service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {SubjectTaskOperations} from '../models/subject-task-operations';
import {UnlimitedTaskContentService} from '../../task-content/services/unlimited-task-content.service';
import {EventOutcomeMessageResource} from '../../resources/interface/message-resource';
import {Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../task-content/model/policy';
import {CallChainService} from '../../utility/call-chain/call-chain.service';
import {Task} from '../../resources/interface/task';
import {UserService} from '../../user/services/user.service';
import {TaskEventNotification} from '../../task-content/model/task-event-notification';
import {TaskEvent} from '../../task-content/model/task-event';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {TaskDataService} from './task-data.service';
import {DataFocusPolicyService} from './data-focus-policy.service';
import {TaskEventOutcome} from '../../event/model/event-outcomes/task-outcomes/task-event-outcome';
import {createMockCase} from '../../utility/tests/utility/create-mock-case';
import {createMockNet} from '../../utility/tests/utility/create-mock-net';
import {ChangedFieldsService} from '../../changed-fields/services/changed-fields.service';
import {User} from '../../user/models/user';
import {ProcessRole} from '../../resources/interface/process-role';

describe('CancelTaskService', () => {
    let service: CancelTaskService;
    let testTask: Task;
    let resourceService: TestTaskResourceService;
    let callChainService: CallChainService;
    let taskEventService: TaskEventService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                SnackBarModule
            ],
            providers: [
                CancelTaskService,
                TaskEventService,
                TaskRequestStateService,
                TaskDataService,
                DataFocusPolicyService,
                ChangedFieldsService,
                {provide: TaskContentService, useClass: UnlimitedTaskContentService},
                {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: TaskResourceService, useClass: TestTaskResourceService},
                {provide: UserService, useClass: TestUserService}
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                ]
            }
        }).compileComponents();
        service = TestBed.inject(CancelTaskService);
        testTask = {
            caseId: '',
            transitionId: '',
            title: '',
            caseColor: '',
            caseTitle: '',
            user: {
                id: '',
                email: 'mail',
                name: '',
                surname: '',
                fullName: ''
            },
            roles: {
                role: {
                    assign: true,
                    cancel: true,
                    finish: true,
                    set: true,
                    view: true
                }
            },
            startDate: [1],
            finishDate: [1],
            assignPolicy: AssignPolicy.MANUAL,
            dataFocusPolicy: DataFocusPolicy.MANUAL,
            finishPolicy: FinishPolicy.MANUAL,
            stringId: 'taskId',
            layout: {rows: 1, cols: 1, offset: 0},
            dataGroups: [],
            users: {},
            userRefs: {},
            _links: {}
        };
        TestBed.inject(TaskContentService).task = testTask;
        resourceService = TestBed.inject(TaskResourceService) as unknown as TestTaskResourceService;
        callChainService = TestBed.inject(CallChainService);
        taskEventService = TestBed.inject(TaskEventService);
        spyOn(console, 'debug');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should cancel successfully', done => {
        expect(testTask.startDate).toBeTruthy();
        expect(testTask.user).toBeTruthy();
        resourceService.response = {
            success: 'success',
            outcome: {
                outcomes: [],
                message: '',
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
                    dataFocusPolicy: DataFocusPolicy.MANUAL,
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
            } as TaskEventOutcome
        };

        let taskEvent: TaskEventNotification;
        taskEventService.taskEventNotifications$.subscribe(event => {
            taskEvent = event;
        });

        service.cancel(callChainService.create((result) => {
            expect(result).toBeTrue();
            expect(testTask.startDate).toBeFalsy();
            expect(testTask.user).toBeFalsy();

            expect(taskEvent).toBeTruthy();
            expect(taskEvent.taskId).toEqual('taskId');
            expect(taskEvent.success).toBeTrue();
            expect(taskEvent.event).toEqual(TaskEvent.CANCEL);

            done();
        }));
    });

    it('should cancel unsuccessful', done => {
        expect(testTask.startDate).toBeTruthy();
        expect(testTask.user).toBeTruthy();
        resourceService.response = {
            error: 'error',
            outcome: {}
        };

        let taskEvent: TaskEventNotification;
        taskEventService.taskEventNotifications$.subscribe(event => {
            taskEvent = event;
        });

        service.cancel(callChainService.create((result) => {
            expect(result).toBeFalse();
            expect(testTask.startDate).toBeTruthy();
            expect(testTask.user).toBeTruthy();

            expect(taskEvent).toBeTruthy();
            expect(taskEvent.taskId).toEqual('taskId');
            expect(taskEvent.success).toBeFalse();
            expect(taskEvent.event).toEqual(TaskEvent.CANCEL);

            done();
        }));
    });

    it('should cancel error', done => {
        expect(testTask.startDate).toBeTruthy();
        expect(testTask.user).toBeTruthy();
        resourceService.response = {error: 'throw'};

        let taskEvent: TaskEventNotification;
        taskEventService.taskEventNotifications$.subscribe(event => {
            taskEvent = event;
        });

        service.cancel(callChainService.create((result) => {
            expect(result).toBeFalse();
            expect(testTask.startDate).toBeTruthy();
            expect(testTask.user).toBeTruthy();

            expect(taskEvent).toBeTruthy();
            expect(taskEvent.taskId).toEqual('taskId');
            expect(taskEvent.success).toBeFalse();
            expect(taskEvent.event).toEqual(TaskEvent.CANCEL);

            done();
        }));
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

class TestTaskResourceService {

    public response: EventOutcomeMessageResource;

    public cancelTask(): Observable<EventOutcomeMessageResource> {
        if (this.response.error === 'throw') {
            return of(this.response).pipe(map(r => {
                throw throwError(r);
            }));
        }
        return of(this.response);
    }
}

class TestUserService {
    public get user() {
        return new User('id', 'mail', '', '', [], [{stringId: 'role'} as ProcessRole]);
    }

    public hasRoleById(): boolean {
        return true;
    }
}
