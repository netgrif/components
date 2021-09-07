import {TestBed} from '@angular/core/testing';
import {DynamicNavigationRouteProviderService} from './dynamic-navigation-route-provider.service';

describe('DynamicNavigationRouteProviderService', () => {
    let service: DynamicNavigationRouteProviderService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DynamicNavigationRouteProviderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
