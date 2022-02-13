import {TestBed} from '@angular/core/testing';
import {FinishPolicyService} from './finish-policy.service';
import {DataFocusPolicyService} from './data-focus-policy.service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {NullTaskOperations} from '../models/null-task-operations';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateModule} from '@ngx-translate/core';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {FinishTaskService} from './finish-task.service';
import {TaskRequestStateService} from './task-request-state.service';
import {TaskDataService} from './task-data.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UnlimitedTaskContentService} from '../../task-content/services/unlimited-task-content.service';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {ChangedFieldsService} from '../../changed-fields/services/changed-fields.service';

describe('FinishPolicyService', () => {
    let service: FinishPolicyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateModule,
                TranslateLibModule,
                NoopAnimationsModule
            ],
            providers: [
                FinishPolicyService,
                DataFocusPolicyService,
                FinishTaskService,
                TaskRequestStateService,
                TaskDataService,
                TaskEventService,
                ChangedFieldsService,
                {provide: TaskContentService, useClass: UnlimitedTaskContentService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_TASK_OPERATIONS, useClass: NullTaskOperations},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
            ]
        });
        service = TestBed.inject(FinishPolicyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
