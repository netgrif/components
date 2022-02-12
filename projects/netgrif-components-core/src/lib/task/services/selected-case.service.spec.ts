import {TestBed} from '@angular/core/testing';
import {SelectedCaseService} from './selected-case.service';

describe('SelectedCaseService', () => {
    let service: SelectedCaseService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SelectedCaseService]
        });
        service = TestBed.inject(SelectedCaseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
