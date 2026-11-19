import {TestBed} from '@angular/core/testing';

import {WorkflowViewService} from './workflow-view.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('WorkflowsViewService', () => {
    let service: WorkflowViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatDialogModule,
                MatSnackBarModule,
                TranslateLibModule
            ],
            providers: [
                WorkflowViewService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ]
        });
        service = TestBed.inject(WorkflowViewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
