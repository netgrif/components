import {TestBed} from '@angular/core/testing';
import {SingleTaskContentService} from './single-task-content.service';
import {MatSnackBarModule} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';

describe('SingleTaskContentService', () => {
    let service: SingleTaskContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                SingleTaskContentService,
                TranslateService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(SingleTaskContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});