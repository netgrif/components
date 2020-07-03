import {TestBed} from '@angular/core/testing';
import {DelegateTaskService} from './delegate-task.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {TaskRequestStateService} from './task-request-state.service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {SubjectTaskOperations} from '../models/subject-task-operations';
import {TaskContentService} from '../../task-content/services/task-content.service';

describe('DelegateTaskService', () => {
    let service: DelegateTaskService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule, MaterialModule, TranslateLibModule],
            providers: [
                DelegateTaskService,
                TaskRequestStateService,
                TaskContentService,
                {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(DelegateTaskService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
