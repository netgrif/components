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

describe('FinishTaskService', () => {
    let service: FinishTaskService;

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
                FinishTaskService,
                TaskRequestStateService,
                TaskDataService,
                DataFocusPolicyService,
                TaskContentService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_TASK_OPERATIONS, useClass: NullTaskOperations}
            ]
        });
        service = TestBed.inject(FinishTaskService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
