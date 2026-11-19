import {TestBed} from '@angular/core/testing';
import {SingleTaskContentService} from './single-task-content.service';
import {TranslateService} from '@ngx-translate/core';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('SingleTaskContentService', () => {
    let service: SingleTaskContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule,
                TranslateLibModule
            ],
            providers: [
                SingleTaskContentService,
                TranslateService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(SingleTaskContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
