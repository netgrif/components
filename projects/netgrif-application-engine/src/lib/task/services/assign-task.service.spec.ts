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

describe('AssignTaskService', () => {
    let service: AssignTaskService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateModule,
                TranslateLibModule,
                NoopAnimationsModule,
            ],
            providers: [
                AssignTaskService,
                TaskRequestStateService,
                TaskDataService,
                DataFocusPolicyService,
                TaskContentService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_TASK_OPERATIONS, useClass: NullTaskOperations}
            ]
        });
        service = TestBed.inject(AssignTaskService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
