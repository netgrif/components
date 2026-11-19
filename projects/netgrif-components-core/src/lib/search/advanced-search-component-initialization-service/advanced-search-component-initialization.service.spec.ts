import {TestBed} from '@angular/core/testing';
import {AdvancedSearchComponentInitializationService} from './advanced-search-component-initialization.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AdvancedSearchComponentInitializationService', () => {
    let service: AdvancedSearchComponentInitializationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [AdvancedSearchComponentInitializationService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
