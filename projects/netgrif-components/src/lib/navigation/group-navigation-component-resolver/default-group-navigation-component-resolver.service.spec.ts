import {TestBed} from '@angular/core/testing';
import {DefaultGroupNavigationComponentResolverService} from './default-group-navigation-component-resolver.service';
import {
    ConfigurationService,
    TestConfigurationService,
    TestMockDependenciesModule,
    TestViewService,
    ViewService
} from '@netgrif/components-core';
import {RouterModule} from "@angular/router";

describe('DefaultGroupNavigationComponentResolverService', () => {
    let service: DefaultGroupNavigationComponentResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TestMockDependenciesModule,
                RouterModule.forRoot([])
            ],
            providers: [
                DefaultGroupNavigationComponentResolverService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService}
            ]
        });
        service = TestBed.inject(DefaultGroupNavigationComponentResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
