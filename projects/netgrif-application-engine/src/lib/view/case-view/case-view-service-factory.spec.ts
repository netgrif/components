import {TestBed} from '@angular/core/testing';

import {CaseViewServiceFactory} from './case-view-service-factory';

describe('CaseViewServiceFactoryService', () => {
    let service: CaseViewServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CaseViewServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
