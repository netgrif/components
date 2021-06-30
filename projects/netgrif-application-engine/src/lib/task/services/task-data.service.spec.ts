import {TestBed} from '@angular/core/testing';
import {TaskDataService} from './task-data.service';
import {TaskRequestStateService} from './task-request-state.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MaterialModule} from '../../material/material.module';
import {DataFocusPolicyService} from './data-focus-policy.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {NullTaskOperations} from '../models/null-task-operations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UnlimitedTaskContentService} from '../../task-content/services/unlimited-task-content.service';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {createMockTask} from '../../utility/tests/utility/create-mock-task';
import {createMockField} from '../../utility/tests/utility/create-mock-field';
import {createMockDataGroup} from '../../utility/tests/utility/create-mock-datagroup';
import {CallChainService} from '../../utility/call-chain/call-chain.service';
import {DataGroup} from '../../resources/interface/data-groups';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {delay, take} from 'rxjs/operators';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {TaskSetDataRequestBody} from '../../resources/interface/task-set-data-request-body';
import {ChangedFieldContainer} from '../../resources/interface/changed-field-container';
import {FormControl} from '@angular/forms';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';

describe('TaskDataService', () => {
    let service: TaskDataService;
    let taskContentService: TaskContentService;
    let afterActionService: CallChainService;
    let taskResourceService: MockTaskResourceService;
    let taskStateService: TestTaskRequestStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateLibModule,
                HttpClientTestingModule,
                MaterialModule,
                NoopAnimationsModule,
                SnackBarModule
            ],
            providers: [
                TaskDataService,
                DataFocusPolicyService,
                TaskEventService,
                {provide: TaskRequestStateService, useClass: TestTaskRequestStateService},
                {provide: TaskContentService, useClass: UnlimitedTaskContentService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_TASK_OPERATIONS, useClass: NullTaskOperations},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: TaskResourceService, useClass: MockTaskResourceService},
            ]
        });
        service = TestBed.inject(TaskDataService);
        taskContentService = TestBed.inject(TaskContentService);
        afterActionService = TestBed.inject(CallChainService);
        taskResourceService = TestBed.inject(TaskResourceService) as unknown as MockTaskResourceService;
        taskStateService = TestBed.inject(TaskRequestStateService) as unknown as TestTaskRequestStateService;
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // NAE-1222
    it('should be destroyed with no task set', () => {
        expect(service).toBeTruthy();
        expect(service.ngOnDestroy()).toBeUndefined(); // undefined is the default return value
    });

    // NAE-1222
    it('should be destroyed with task set', () => {
        expect(service).toBeTruthy();
        expect(taskContentService).toBeTruthy();
        taskContentService.task = createMockTask();
        expect(service.ngOnDestroy()).toBeUndefined();
    });

    it('should initialize task data fields', (done) => {
        expect(service).toBeTruthy();
        expect(taskContentService).toBeTruthy();

        taskContentService.task = createMockTask();
        taskResourceService.response = [createMockDataGroup([
            createMockField(true, {x: 0, y: 0, cols: 0, rows: 0}, 0),
            createMockField(true, {x: 1, y: 0, cols: 0, rows: 0}, 1)
        ])];
        expect(taskContentService.task.dataGroups.length).toEqual(0);

        service.initializeTaskDataFields(afterActionService.create(success => {
            if (success) {
                expect(taskContentService.task.dataGroups.length).toEqual(1);
                expect(taskContentService.task.dataGroups[0].fields.length).toEqual(2);

                const mockField = taskContentService.task.dataGroups[0].fields[0];
                expect(((mockField as any)._value as BehaviorSubject<boolean>).observers.length).toEqual(1);

                expect(service.ngOnDestroy()).toBeUndefined();
                done();
            }
        }));
    });

    it('should update task data fields', (done) => {
        expect(service).toBeTruthy();
        expect(taskContentService).toBeTruthy();

        taskContentService.task = createMockTask();
        taskResourceService.response = [createMockDataGroup([
            createMockField(true, {x: 0, y: 0, cols: 0, rows: 0}, 0),
            createMockField(true, {x: 1, y: 0, cols: 0, rows: 0}, 1)
        ])];

        service.initializeTaskDataFields(afterActionService.create(success => {
            if (success) {
                expect(taskContentService.task.dataGroups.length).toEqual(1);
                expect(taskContentService.task.dataGroups[0].fields.length).toEqual(2);

                const mockField = taskContentService.task.dataGroups[0].fields[0];
                expect(((mockField as any)._value as BehaviorSubject<boolean>).observers.length).toEqual(1);
                mockField.registerFormControl(new FormControl());

                let subCallCount = 0;
                taskStateService.updating$.pipe(take(3)).subscribe(updating => {
                    switch (subCallCount) {
                        case 0:
                            expect(updating).toBeFalse();
                            break;
                        case 1:
                            expect(updating).toBeTrue();
                            break;
                        case 2:
                            expect(updating).toBeFalse();
                            done();
                            break;
                    }
                    subCallCount++;
                });

                taskContentService.task.user = {email: '', id: '', name: '', surname: '', fullName: ''};

                mockField.value = !mockField.value;
            }
        }));
    });

    // NAE-1386
});

class MockTaskResourceService {

    private _delay = 100;
    private _response: Array<DataGroup> = [];

    public set delay(delayMs: number) {
        this._delay = delayMs;
    }

    public set response(dataGroups: Array<DataGroup>) {
        this._response = dataGroups;
    }

    public getData(taskId: string): Observable<Array<DataGroup>> {
        return of(this._response).pipe(delay(this._delay));
    }

    public setData(taskId: string, body: TaskSetDataRequestBody): Observable<ChangedFieldContainer> {
        return of({changedFields: {}}).pipe(delay(this._delay));
    }
}

class TestTaskRequestStateService extends TaskRequestStateService {
    public get loading$(): Observable<boolean> {
        return this._loading.asObservable();
    }

    public get updating$(): Observable<boolean> {
        return this._updating.asObservable();
    }
}
