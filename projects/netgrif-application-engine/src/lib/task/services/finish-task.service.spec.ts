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
import {MessageResource} from '../../resources/interface/message-resource';
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

describe('FinishTaskService', () => {
    let service: FinishTaskService;
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
                FinishTaskService,
                TaskRequestStateService,
                TaskDataService,
                DataFocusPolicyService,
                {provide: TaskContentService, useClass: UnlimitedTaskContentService},
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
        service = TestBed.inject(FinishTaskService);
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
            dataSize: 0,
            _links: {}
        };
        TestBed.inject(TaskContentService).task = testTask;
        resourceService = TestBed.inject(TaskResourceService) as unknown as TestTaskResourceService;
        callChainService = TestBed.inject(CallChainService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should finish successfully', done => {
        expect(testTask.startDate).toBeTruthy();
        resourceService.response = {success: 'success'};
        service.validateDataAndFinish(callChainService.create((result) => {
            expect(result).toBeTrue();
            expect(testTask.startDate).toBeFalsy();
            expect(testTask.finishDate).toBeFalsy();
            done();
        }));
    });

    it('should finish unsuccessful', done => {
        expect(testTask.startDate).toBeTruthy();
        resourceService.response = {error: 'error'};
        service.validateDataAndFinish(callChainService.create((result) => {
            expect(testTask.startDate).toBeTruthy();
            expect(result).toBeFalse();
            done();
        }));
    });

    it('should finish error', done => {
        expect(testTask.startDate).toBeTruthy();
        resourceService.response = {error: 'throw'};
        service.validateDataAndFinish(callChainService.create((result) => {
            expect(testTask.startDate).toBeTruthy();
            expect(result).toBeFalse();
            done();
        }));
    });
});

class TestTaskResourceService {

    public response: MessageResource;

    public finishTask(): Observable<MessageResource> {
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
