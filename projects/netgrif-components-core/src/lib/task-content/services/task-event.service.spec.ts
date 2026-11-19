import {TestBed} from '@angular/core/testing';
import {TaskEventService} from './task-event.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TaskContentService} from './task-content.service';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('TaskEventService', () => {
    let service: TaskEventService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ MaterialModule, TranslateLibModule],
            providers: [
                TaskEventService,
                TaskContentService,
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(TaskEventService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
