import {TestBed} from '@angular/core/testing';
import {ActiveGroupService} from './active-group.service';
import {TestMockDependenciesModule} from '../../utility/tests/test-mock-dependencies.module';

describe('ActiveGroupService', () => {
    let service: ActiveGroupService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TestMockDependenciesModule
            ]
        });
        service = TestBed.inject(ActiveGroupService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
