import {TestBed} from '@angular/core/testing';
import {UserListService} from './user-list.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('UserListService', () => {
    let service: UserListService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSnackBarModule, NoopAnimationsModule, TranslateLibModule],
            providers: [
                UserListService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
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
