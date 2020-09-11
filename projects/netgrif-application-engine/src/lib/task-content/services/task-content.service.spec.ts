import {TestBed} from '@angular/core/testing';

import {TaskContentService} from './task-content.service';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TaskPanelContentService', () => {
    let service: TaskContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, TranslateLibModule, HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                TaskContentService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(TaskContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
