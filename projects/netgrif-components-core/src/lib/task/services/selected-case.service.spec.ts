import {TestBed} from '@angular/core/testing';
import {SelectedCaseService} from './selected-case.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SelectedCaseService', () => {
    let service: SelectedCaseService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule],
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
