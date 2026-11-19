import {TestBed} from '@angular/core/testing';
import {UserListService} from './user-list.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('UserListService', () => {
    let service: UserListService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ MatSnackBarModule, TranslateLibModule],
            providers: [
                UserListService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(UserListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
