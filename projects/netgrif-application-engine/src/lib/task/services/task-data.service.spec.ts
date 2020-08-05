import {TestBed} from '@angular/core/testing';
import {TaskDataService} from './task-data.service';
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
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TaskDataService', () => {
    let service: TaskDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule,
                TranslateLibModule,
                HttpClientTestingModule,
                MaterialModule,
                NoopAnimationsModule
            ],
            providers: [
                TaskDataService,
                TaskRequestStateService,
                DataFocusPolicyService,
                TaskContentService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_TASK_OPERATIONS, useClass: NullTaskOperations}
            ]
        });
        service = TestBed.inject(TaskDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
