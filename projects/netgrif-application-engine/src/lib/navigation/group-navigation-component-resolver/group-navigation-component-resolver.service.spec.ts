import {TestBed} from '@angular/core/testing';
import {GroupNavigationComponentResolverService} from './group-navigation-component-resolver.service';

describe('GroupNavigationComponentResolverService', () => {
    let service: GroupNavigationComponentResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GroupNavigationComponentResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
