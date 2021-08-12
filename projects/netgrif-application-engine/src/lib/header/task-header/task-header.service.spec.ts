import {TestBed} from '@angular/core/testing';
import {TaskHeaderService} from './task-header.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {ViewService} from '../../routing/view-service/view.service';
import {TestViewService} from '../../utility/tests/test-view-service';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {
    TestTaskBaseFilterProvider,
    TestTaskViewAllowedNetsFactory
} from '../../utility/tests/test-factory-methods';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {SearchService} from '../../search/search-service/search.service';
import {NAE_BASE_FILTER} from '../../search/models/base-filter-injection-token';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';

describe('TaskHeaderService', () => {
    let service: TaskHeaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateLibModule,
                HttpClientTestingModule,
                MatSnackBarModule,
                MatIconModule, NoopAnimationsModule,
                RouterTestingModule.withRoutes([]),
                SnackBarModule
            ],
            providers: [
                TaskHeaderService,
                TaskViewService,
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestTaskBaseFilterProvider
                },
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                {provide: AllowedNetsService, useFactory: TestTaskViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
        });
        service = TestBed.inject(TaskHeaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
