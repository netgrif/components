import {TestBed} from '@angular/core/testing';
import {FileDownloadService} from './file-download.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {MaterialModule} from '../../../../material/material.module';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';

describe('FileDownloadService', () => {
    let service: FileDownloadService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule, TranslateLibModule],
            providers: [
                FileDownloadService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]});
        service = TestBed.inject(FileDownloadService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
