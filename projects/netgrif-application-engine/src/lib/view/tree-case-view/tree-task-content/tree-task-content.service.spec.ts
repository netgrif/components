import {TestBed} from '@angular/core/testing';
import {TreeTaskContentService} from './tree-task-content.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TreeCaseViewService} from '../tree-case-view.service';
import {TaskDataService} from '../../../task/services/task-data.service';
import {TaskRequestStateService} from '../../../task/services/task-request-state.service';
import {TranslateModule} from '@ngx-translate/core';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {MaterialModule} from '../../../material/material.module';
import {DataFocusPolicyService} from '../../../task/services/data-focus-policy.service';
import {AssignPolicyService} from '../../../task/services/assign-policy.service';
import {AssignTaskService} from '../../../task/services/assign-task.service';
import {FinishPolicyService} from '../../../task/services/finish-policy.service';
import {FinishTaskService} from '../../../task/services/finish-task.service';
import {CancelTaskService} from '../../../task/services/cancel-task.service';
import {TaskEventService} from '../../../task-content/services/task-event.service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {NAE_TASK_OPERATIONS} from '../../../task/models/task-operations-injection-token';
import {TaskContentService} from '../../../task-content/services/task-content.service';
import {SubjectTaskOperations} from '../../../task/models/subject-task-operations';

describe('TreeTaskContentService', () => {
    let service: TreeTaskContentService;

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
                TreeTaskContentService,
                TreeCaseViewService,
                TaskDataService,
                TaskRequestStateService,
                DataFocusPolicyService,
                AssignPolicyService,
                AssignTaskService,
                FinishPolicyService,
                FinishTaskService,
                CancelTaskService,
                TaskEventService,
                AuthenticationMethodService,
                TaskContentService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations}
            ]
        });
        service = TestBed.inject(TreeTaskContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});