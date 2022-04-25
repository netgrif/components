import {TestBed} from '@angular/core/testing';

import {PublicUrlResolverService} from './public-url-resolver.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PublicUrlResolverService', () => {
    let service: PublicUrlResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [NoopAnimationsModule, HttpClientTestingModule]});
        service = TestBed.inject(PublicUrlResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
