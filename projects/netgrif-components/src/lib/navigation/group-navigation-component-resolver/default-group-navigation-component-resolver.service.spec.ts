import {TestBed} from '@angular/core/testing';
import {DefaultGroupNavigationComponentResolverService} from './default-group-navigation-component-resolver.service';
import {TestMockDependenciesModule} from '@netgrif/components-core';

describe('DefaultGroupNavigationComponentResolverService', () => {
    let service: DefaultGroupNavigationComponentResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TestMockDependenciesModule
            ],
            providers: [
                DefaultGroupNavigationComponentResolverService
            ]
        });
        service = TestBed.inject(DefaultGroupNavigationComponentResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
