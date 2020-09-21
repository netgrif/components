import {TestBed} from '@angular/core/testing';

import {OperatorService} from './operator.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('OperatorService', () => {
    let service: OperatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule]
        });
        service = TestBed.inject(OperatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
