import {ObservableCaseViewServiceFactory} from './observable-case-view-service';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../../material/material.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {SideMenuService} from '../../../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {ProcessService} from '../../../../process/process.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {TranslateService} from '@ngx-translate/core';
import {SearchService} from '../../../../search/search-service/search.service';
import {TestCaseSearchServiceFactory} from '../../../../utility/tests/test-factory-methods';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {AuthenticationMethodService} from '../../../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../../../utility/tests/mocks/mock-authentication-method-service';

describe('ObservableCaseViewService', () => {
    let service: ObservableCaseViewServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                ObservableCaseViewServiceFactory,
                SideMenuService,
                CaseResourceService,
                SnackBarService,
                ProcessService,
                LoggerService,
                TranslateService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {
                    provide: SearchService,
                    useFactory: TestCaseSearchServiceFactory
                },
                {
                    provide: ConfigurationService,
                    useClass: TestConfigurationService
                }
            ]
        });
        service = TestBed.inject(ObservableCaseViewServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
