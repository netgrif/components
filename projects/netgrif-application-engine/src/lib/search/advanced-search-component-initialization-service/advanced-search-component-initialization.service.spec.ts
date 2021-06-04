import {TestBed} from '@angular/core/testing';
import {AdvancedSearchComponentInitializationService} from './advanced-search-component-initialization.service';

describe('AdvancedSearchComponentInitializationService', () => {
    let service: AdvancedSearchComponentInitializationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AdvancedSearchComponentInitializationService]
        });
        service = TestBed.inject(AdvancedSearchComponentInitializationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
