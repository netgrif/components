import {TestBed} from '@angular/core/testing';
import {CancelTaskService} from './cancel-task.service';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {NullAuthenticationService} from '../../authentication/services/methods/null-authentication/null-authentication.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskRequestStateService} from './task-request-state.service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {SubjectTaskOperations} from '../models/subject-task-operations';

describe('CancelTaskService', () => {
    let service: CancelTaskService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, TranslateLibModule, HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                CancelTaskService,
                TaskEventService,
                TaskContentService,
                TaskRequestStateService,
                {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: NullAuthenticationService}
            ]
        });
        service = TestBed.inject(CancelTaskService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
