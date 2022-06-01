import {TestBed} from '@angular/core/testing';
import {AdvancedSearchComponentInitializationService} from './advanced-search-component-initialization.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AdvancedSearchComponentInitializationService', () => {
    let service: AdvancedSearchComponentInitializationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule],
            providers: [AdvancedSearchComponentInitializationService]
        });
        service = TestBed.inject(AdvancedSearchComponentInitializationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
