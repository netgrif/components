import {TestBed} from '@angular/core/testing';

import {UserAssignService} from './user-assign.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {AuthenticationService} from '../../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../../utility/tests/mocks/mock-authentication.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../../../material/material.module';
import {SnackBarModule} from '../../../../snack-bar/snack-bar.module';

describe('UserAssignService', () => {
    let service: UserAssignService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TranslateLibModule,
                NoopAnimationsModule,
                MaterialModule,
                SnackBarModule
            ],
            providers: [
                UserAssignService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService}
            ]
        }).compileComponents();
        service = TestBed.inject(UserAssignService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
