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

describe('TaskDataService', () => {
    let service: TaskDataService;
    let taskContentService: TaskContentService;

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
            ]
        });
        service = TestBed.inject(TaskDataService);
        taskContentService = TestBed.inject(TaskContentService);
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
