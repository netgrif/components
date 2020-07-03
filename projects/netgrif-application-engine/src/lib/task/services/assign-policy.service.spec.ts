import {TestBed} from '@angular/core/testing';
import {AssignPolicyService} from './assign-policy.service';
import {TaskDataService} from './task-data.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TaskRequestStateService} from './task-request-state.service';
import {TranslateModule} from '@ngx-translate/core';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MaterialModule} from '../../material/material.module';
import {DataFocusPolicyService} from './data-focus-policy.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {NullTaskOperations} from '../models/null-task-operations';
import {AssignTaskService} from './assign-task.service';
import {CancelTaskService} from './cancel-task.service';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {FinishPolicyService} from './finish-policy.service';
import {FinishTaskService} from './finish-task.service';

describe('AssignPolicyService', () => {
    let service: AssignPolicyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                TranslateModule,
                TranslateLibModule,
                HttpClientTestingModule,
                MaterialModule,
            ],
            providers: [
                AssignPolicyService,
                TaskDataService,
                TaskRequestStateService,
                DataFocusPolicyService,
                TaskContentService,
                AssignTaskService,
                CancelTaskService,
                TaskEventService,
                AuthenticationMethodService,
                FinishPolicyService,
                FinishTaskService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_TASK_OPERATIONS, useClass: NullTaskOperations}
            ]
        });
        service = TestBed.inject(AssignPolicyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
