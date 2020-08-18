import {TestBed} from '@angular/core/testing';
import {UserPreferenceService} from './user-preference.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';

describe('UserPreferenceService', () => {
    let service: UserPreferenceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule,
                NoopAnimationsModule,
                MatIconModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                AuthenticationMethodService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService}
            ],
            declarations: [
                ErrorSnackBarComponent,
                SuccessSnackBarComponent
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
        });
        service = TestBed.inject(UserPreferenceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should test user preferences', () => {
        service.setTaskFilters('viewId', ['filterId']);
        const taskFilters = service.getTaskFilters('viewId');
        expect(taskFilters.length).toEqual(1);
        expect(taskFilters[0]).toEqual('filterId');

        service.setCaseFilters('viewId', ['filterId']);
        const caseFilters = service.getCaseFilters('viewId');
        expect(caseFilters.length).toEqual(1);
        expect(caseFilters[0]).toEqual('filterId');

        service.setHeaders('viewId', ['header0']);
        const headers = service.getHeaders('viewId');
        expect(headers.length).toEqual(1);
        expect(headers[0]).toEqual('header0');

        service.setLocale('sk-SK');
        expect(service.getLocale()).toEqual('sk-SK');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
