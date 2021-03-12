import { TaskViewServiceFactory } from './task-view-service-factory';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../../material/material.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SnackBarModule} from '../../../../snack-bar/snack-bar.module';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {UserService} from '../../../../user/services/user.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../translate/language.service';
import {ProcessService} from '../../../../process/process.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {AuthenticationMethodService} from '../../../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../../utility/tests/mocks/mock-authentication.service';
import {SearchService} from '../../../../search/search-service/search.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {NAE_BASE_FILTER} from '../../../../search/models/base-filter-injection-token';
import {TestTaskBaseFilterProvider} from '../../../../utility/tests/test-factory-methods';

describe('TaskViewServiceFactory', () => {
    let service: TaskViewServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule,
                SnackBarModule
            ],
            providers: [
                TaskViewServiceFactory,
                TaskResourceService,
                UserService,
                SnackBarService,
                TranslateService,
                LanguageService,
                ProcessService,
                LoggerService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestTaskBaseFilterProvider
                },
                {
                    provide: ConfigurationService,
                    useClass: TestConfigurationService
                }
            ]
        });
        service = TestBed.inject(TaskViewServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
