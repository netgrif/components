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

    const FIELD_1 = 'field1';
    const FIELD_2 = 'field2';
    const FIELD_1_RESPONSE = 'field1success';
    const FIELD_2_RESPONSE = 'field2success';

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
            createMockField(true, {x: 0, y: 0, cols: 0, rows: 0}, FIELD_1),
            createMockField(true, {x: 1, y: 0, cols: 0, rows: 0}, FIELD_2)
        ])];

        taskResourceService.setChangedFieldsResponse(FIELD_1, FIELD_1_RESPONSE);

        service.initializeTaskDataFields(afterActionService.create(success => {
            if (success) {
                expect(taskContentService.task.dataGroups.length).toEqual(1);
                expect(taskContentService.task.dataGroups[0].fields.length).toEqual(2);

                const mockField = taskContentService.task.dataGroups[0].fields[0];
                expect(((mockField as any)._value as BehaviorSubject<boolean>).observers.length).toEqual(1);
                mockField.registerFormControl(new FormControl());

                service.changedFields$.pipe(take(1)).subscribe(changed => {
                    expect(changed.hasOwnProperty(FIELD_1_RESPONSE));
                    done();
                });

                taskContentService.task.user = {email: '', id: '', name: '', surname: '', fullName: ''};

                mockField.value = !mockField.value;
            }
        }));
    });

    // NAE-1386
    it('should queue update task data field requests', (done) => {
        expect(service).toBeTruthy();
        expect(taskContentService).toBeTruthy();

        taskContentService.task = createMockTask();
        taskResourceService.response = [createMockDataGroup([
            createMockField(true, {x: 0, y: 0, cols: 0, rows: 0}, FIELD_1),
            createMockField(true, {x: 1, y: 0, cols: 0, rows: 0}, FIELD_2)
        ])];

        taskResourceService.setChangedFieldsResponse(FIELD_1, FIELD_1_RESPONSE);
        taskResourceService.setChangedFieldsResponse(FIELD_2, FIELD_2_RESPONSE);

        service.initializeTaskDataFields(afterActionService.create(success => {
            if (success) {
                expect(taskContentService.task.dataGroups.length).toEqual(1);
                expect(taskContentService.task.dataGroups[0].fields.length).toEqual(2);

                const mockField1 = taskContentService.task.dataGroups[0].fields[0];
                expect(((mockField1 as any)._value as BehaviorSubject<boolean>).observers.length).toEqual(1);
                mockField1.registerFormControl(new FormControl());
                const mockField2 = taskContentService.task.dataGroups[0].fields[1];
                expect(((mockField2 as any)._value as BehaviorSubject<boolean>).observers.length).toEqual(1);
                mockField2.registerFormControl(new FormControl());

                let numOfResponses = 0;
                service.changedFields$.pipe(take(2)).subscribe(changed => {
                    if (changed.hasOwnProperty(FIELD_1_RESPONSE) || changed.hasOwnProperty(FIELD_2_RESPONSE)) {
                        numOfResponses++;
                    }
                    if (numOfResponses === 2) {
                        done();
                    }
                });

                taskContentService.task.user = {email: '', id: '', name: '', surname: '', fullName: ''};

                mockField1.value = !mockField1.value;
                mockField2.value = !mockField2.value;
            }
        }));
    });
});

class MockTaskResourceService {

    private _delay = 100;
    private _response: Array<DataGroup> = [];
    private _changedFieldsMap: Map<string, string> = new Map();

    public set delay(delayMs: number) {
        this._delay = delayMs;
    }

    public set response(dataGroups: Array<DataGroup>) {
        this._response = dataGroups;
    }

    public setChangedFieldsResponse(key: string, value: string) {
        this._changedFieldsMap.set(key, value);
    }

    public getData(taskId: string): Observable<Array<DataGroup>> {
        return of(this._response).pipe(delay(this._delay));
    }

    public setData(taskId: string, body: TaskSetDataRequestBody): Observable<ChangedFieldContainer> {
        const response = {};
        Object.keys(body).forEach(key => {
            if (this._changedFieldsMap.has(key)) {
                response[this._changedFieldsMap.get(key)] = {};
            }
        });
        return of({changedFields: response}).pipe(delay(this._delay));
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
