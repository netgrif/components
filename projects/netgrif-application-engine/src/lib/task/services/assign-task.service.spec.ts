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
import {MessageResource} from '../../resources/interface/message-resource';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {SingleTaskContentService} from '../../task-content/services/single-task-content.service';
import {Task} from '../../resources/public-api';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../task-content/model/policy';
import {CallChainService} from '../../utility/call-chain/call-chain.service';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';
import {map} from 'rxjs/operators';

describe('AssignTaskService', () => {
    let service: AssignTaskService;
    let testTask: Task;
    let resourceService: TestTaskResourceService;
    let callChainService: CallChainService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateModule,
                TranslateLibModule,
                NoopAnimationsModule,
                SnackBarModule,
            ],
            providers: [
                AssignTaskService,
                TaskRequestStateService,
                TaskDataService,
                DataFocusPolicyService,
                {provide: TaskContentService, useClass: SingleTaskContentService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_TASK_OPERATIONS, useClass: NullTaskOperations},
                {provide: TaskResourceService, useClass: TestTaskResourceService}
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
            roles: {},
            startDate: [1],
            finishDate: [1],
            assignPolicy: AssignPolicy.manual,
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.manual,
            stringId: '',
            layout: {rows: 1, cols: 1, offset: 0},
            dataGroups: [],
            _links: {}
        };
        TestBed.inject(TaskContentService).task = testTask;
        resourceService = TestBed.inject(TaskResourceService) as unknown as TestTaskResourceService;
        callChainService = TestBed.inject(CallChainService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should assign successfully', done => {
        expect(testTask.startDate).toBeTruthy();
        resourceService.response = {success: 'success'};
        service.assign(callChainService.create((result) => {
            expect(testTask.startDate).toBeFalsy();
            expect(result).toBeTrue();
            done();
        }));
    });

    it('should assign unsuccessful', done => {
        expect(testTask.startDate).toBeTruthy();
        resourceService.response = {error: 'error'};
        service.assign(callChainService.create((result) => {
            expect(testTask.startDate).toBeTruthy();
            expect(result).toBeFalse();
            done();
        }));
    });

    it('should assign error', done => {
        expect(testTask.startDate).toBeTruthy();
        resourceService.response = {error: 'throw'};
        service.assign(callChainService.create((result) => {
            expect(testTask.startDate).toBeTruthy();
            expect(result).toBeFalse();
            done();
        }));
    });
});

class TestTaskResourceService {

    public response: MessageResource;

    public assignTask(): Observable<MessageResource> {
        if (this.response.error === 'throw') {
            return of(this.response).pipe(map(r => {
                throw throwError(r);
            }));
        }
        return of(this.response);
    }
}
