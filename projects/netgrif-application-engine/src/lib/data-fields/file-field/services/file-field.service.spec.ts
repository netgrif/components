import {TestBed} from '@angular/core/testing';
import {FileFieldService} from './file-field.service';
import {FileDownloadService} from './download/file-download.service';
import {FileUploadService} from './upload/file-upload.service';
import {SideMenuService} from '../../../side-menu/services/side-menu.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../material/material.module';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('FileFieldService', () => {
    let service: FileFieldService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                FileDownloadService,
                FileUploadService,
                SideMenuService,
                SnackBarService,
                FileFieldService,
                AuthenticationMethodService,
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(FileFieldService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

