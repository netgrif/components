import {TestBed} from '@angular/core/testing';
import {LanguageService} from './language.service';
import {MaterialModule} from '../material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from './translate-lib.module';
import {AuthenticationMethodService} from '../authentication/services/authentication-method.service';
import {AuthenticationService} from '../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../configuration/configuration.service';
import {TestConfigurationService} from '../utility/tests/test-config';
import {ErrorSnackBarComponent} from '../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MockAuthenticationMethodService} from '../utility/tests/mocks/mock-authentication-method-service';
import {SnackBarModule} from '../snack-bar/snack-bar.module';

describe('LanguageService', () => {
    let service: LanguageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                HttpClientTestingModule,
                TranslateLibModule,
                NoopAnimationsModule,
                SnackBarModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
        });
        service = TestBed.inject(LanguageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set lang', () => {
        service.setLanguage('en-US');
        expect(localStorage.getItem('Language')).toEqual('en');
    });

    it('should set slovak lang', () => {
        service.setLanguage('sk');
        expect(localStorage.getItem('Language')).toEqual('sk');
    });

    it('should set german lang', () => {
        service.setLanguage('de');
        expect(localStorage.getItem('Language')).toEqual('de');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
