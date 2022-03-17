import {TestBed} from '@angular/core/testing';
import {ActiveGroupService} from './active-group.service';
import {TestMockDependenciesModule} from '../../utility/tests/test-mock-dependencies.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ActiveGroupService', () => {
    let service: ActiveGroupService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                TestMockDependenciesModule
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
