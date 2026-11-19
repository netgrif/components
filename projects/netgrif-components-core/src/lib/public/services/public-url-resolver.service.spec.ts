import {TestBed} from '@angular/core/testing';

import {PublicUrlResolverService} from './public-url-resolver.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('PublicUrlResolverService', () => {
    let service: PublicUrlResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]});
        service = TestBed.inject(PublicUrlResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
