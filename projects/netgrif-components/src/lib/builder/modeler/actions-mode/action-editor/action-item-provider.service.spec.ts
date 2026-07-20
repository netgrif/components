import {TestBed} from '@angular/core/testing';
import {ActionItemProviderService} from './action-item-provider.service';

describe('ActionItemproviderService', () => {
    let service: ActionItemProviderService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [ActionItemProviderService]});
        service = TestBed.inject(ActionItemProviderService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
