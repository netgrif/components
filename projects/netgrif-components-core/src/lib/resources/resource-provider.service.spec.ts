import {TestBed} from '@angular/core/testing';

import {ResourceProvider} from './resource-provider.service';
import {HttpClient, provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('ResourceProviderService', () => {
    let service: ResourceProvider;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [HttpClient,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(ResourceProvider);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
