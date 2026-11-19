import {TestBed} from '@angular/core/testing';
import {ActiveGroupService} from './active-group.service';
import {TestMockDependenciesModule} from '../../utility/tests/test-mock-dependencies.module';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('ActiveGroupService', () => {
    let service: ActiveGroupService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestMockDependenciesModule],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(ActiveGroupService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
