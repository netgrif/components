import {TestBed} from '@angular/core/testing';
import {TaskRequestStateService} from './task-request-state.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {UnlimitedTaskContentService} from '../../task-content/services/unlimited-task-content.service';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('TaskRequestStateService', () => {
    let service: TaskRequestStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
            ],
            providers: [
                TaskRequestStateService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: TaskContentService, useClass: UnlimitedTaskContentService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ]
        });
        service = TestBed.inject(TaskRequestStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
