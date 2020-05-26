import {TestBed} from '@angular/core/testing';
import {RoutingBuilderService} from './routing-builder.service';

describe('RoutingBuilderService', () => {
    let service: RoutingBuilderService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RoutingBuilderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
