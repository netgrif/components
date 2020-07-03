import {TestBed} from '@angular/core/testing';
import {CaseTreeService} from './case-tree.service';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {TreeCaseViewService} from '../tree-case-view.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('CaseTreeService', () => {
    let service: CaseTreeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateLibModule, HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                TreeCaseViewService,
                CaseTreeService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(CaseTreeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
