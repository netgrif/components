import {TestBed} from '@angular/core/testing';
import {CaseViewService} from './case-view-service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../material/material.module';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {of} from 'rxjs';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../panel/task-panel/policy';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';

describe('CaseViewService', () => {
    let service: CaseViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule],
            providers: [
                CaseViewService,
                {provide: CaseResourceService, useClass: MyResources},
                {provide: ConfigurationService, useClass: TestConfigurationService}
                ]
        });
        service = TestBed.inject(CaseViewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should load cases', () => {
        service.loadCases();
    });
});

class MyResources {
    searchCases(filter, params) {
        return of([]);
    }
}
