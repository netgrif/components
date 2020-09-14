import {TestBed} from '@angular/core/testing';
import {UnlimitedTaskContentService} from './unlimited-task-content.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateService} from '@ngx-translate/core';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('UnlimitedTaskContentService', () => {
    let service: UnlimitedTaskContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MatSnackBarModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                UnlimitedTaskContentService,
                TranslateService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(UnlimitedTaskContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
