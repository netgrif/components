import {TestBed} from '@angular/core/testing';
import {ArrayTaskViewServiceFactory} from './array-task-view-service-factory';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {UserService} from '../../../../user/services/user.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../translate/language.service';
import {ProcessService} from '../../../../process/process.service';
import {SearchService} from '../../../../search/search-service/search.service';
import {TestTaskSearchServiceFactory} from '../../../../utility/tests/test-factory-methods';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {AuthenticationMethodService} from '../../../../authentication/services/authentication-method.service';
import {MaterialModule} from '../../../../material/material.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';

describe('ArrayTaskViewServiceFactory', () => {
    let service: ArrayTaskViewServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                ArrayTaskViewServiceFactory,
                AuthenticationMethodService,
                TaskResourceService,
                UserService,
                SnackBarService,
                TranslateService,
                LanguageService,
                ProcessService,
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
        service = TestBed.inject(ArrayTaskViewServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
