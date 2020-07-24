import {TestBed} from '@angular/core/testing';
import {FileDownloadService} from './file-download.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {MaterialModule} from '../../../../material/material.module';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {AuthenticationMethodService} from '../../../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../../utility/tests/mocks/mock-user-resource.service';
import {ErrorSnackBarComponent} from '../../../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

describe('FileDownloadService', () => {
    let service: FileDownloadService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule, TranslateLibModule],
            providers: [
                FileDownloadService,
                AuthenticationMethodService,
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
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
        service = TestBed.inject(FileDownloadService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
