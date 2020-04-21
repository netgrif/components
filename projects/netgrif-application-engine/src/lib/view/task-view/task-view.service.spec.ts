import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../material/material.module';
import {TaskViewService} from './task-view.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {TestConfigurationService} from '../../utility/tests/test-config';

describe('TaskViewService', () => {
    let service: TaskViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule, TranslateLibModule],
            providers: [
                TaskViewService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                AuthenticationMethodService
            ]
        });
        service = TestBed.inject(TaskViewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
