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
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';

describe('TaskDataService', () => {
    let service: TaskDataService;
    let taskContentService: TaskContentService;
    let afterActionService: CallChainService;
    let taskResourceService: MockTaskResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateLibModule,
                HttpClientTestingModule,
                MaterialModule,
                NoopAnimationsModule
            ],
            providers: [
                TaskDataService,
                TaskRequestStateService,
                DataFocusPolicyService,
                TaskEventService,
                {provide: TaskContentService, useClass: UnlimitedTaskContentService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_TASK_OPERATIONS, useClass: NullTaskOperations},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: TaskResourceService, useClass: MockTaskResourceService}
            ]
        });
        service = TestBed.inject(TaskDataService);
        taskContentService = TestBed.inject(TaskContentService);
        afterActionService = TestBed.inject(CallChainService);
        taskResourceService = TestBed.inject(TaskResourceService) as unknown as MockTaskResourceService;
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

        service.initializeTaskDataFields(afterActionService.create(success => {
            if (success) {
                expect(service.ngOnDestroy()).toBeUndefined();
                done();
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
}
