import {TestBed} from '@angular/core/testing';
import {DynamicNavigationRouteProviderService} from './dynamic-navigation-route-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DynamicNavigationRouteProviderService', () => {
    let service: DynamicNavigationRouteProviderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(DynamicNavigationRouteProviderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should provide route correctly', () => {
        expect(service).toBeTruthy();
        expect(service.route).toBe('config-route');
        service.route = 'set-route';
        expect(service.route).toBe('set-route');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
