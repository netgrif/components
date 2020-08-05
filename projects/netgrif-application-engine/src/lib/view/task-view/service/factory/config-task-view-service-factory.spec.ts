import {TestBed} from '@angular/core/testing';
import {ConfigTaskViewServiceFactory} from './config-task-view-service-factory';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {UserService} from '../../../../user/services/user.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../translate/language.service';
import {ProcessService} from '../../../../process/process.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {SearchService} from '../../../../search/search-service/search.service';
import {TestTaskSearchServiceFactory} from '../../../../utility/tests/test-factory-methods';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../../material/material.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {AuthenticationMethodService} from '../../../../authentication/services/authentication-method.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ConfigTaskViewServiceFactory', () => {
    let service: ConfigTaskViewServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule
            ],
            providers: [
                ConfigTaskViewServiceFactory,
                TaskResourceService,
                UserService,
                UserService,
                SnackBarService,
                TranslateService,
                LanguageService,
                ProcessService,
                LoggerService,
                AuthenticationMethodService,
                {
                    provide: SearchService,
                    useFactory: TestTaskSearchServiceFactory
                },
                {
                    provide: ConfigurationService,
                    useClass: TestConfigurationService
                }
            ]
        });
        service = TestBed.inject(ConfigTaskViewServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
