import {TestBed} from '@angular/core/testing';
import {SearchChipService} from './search-chip.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchChipService', () => {
    let service: SearchChipService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            providers: [
                SearchChipService
            ]
        });
        service = TestBed.inject(SearchChipService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
