import {TestBed} from '@angular/core/testing';
import {NextGroupService} from './next-group.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MockUserService} from '../../utility/tests/mocks/mock-user.service';
import {UserService} from '../../user/services/user.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {MockCaseResourceService} from '../../utility/tests/mocks/mock-case-resource.service';

describe('NextGroupService', () => {
    let service: NextGroupService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: UserService, useClass: MockUserService},
                {provide: CaseResourceService, useClass: MockCaseResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(NextGroupService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
