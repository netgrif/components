import {TestBed} from '@angular/core/testing';
import {AuthenticationInterceptor} from './authentication-interceptor';
import {AuthenticationMethodService} from './authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';

describe('AuthenticationInterceptor', () => {
    let service: AuthenticationInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: ConfigurationService, useClass: TestConfigService},
                AuthenticationMethodService,
                AuthenticationInterceptor,
            ]});
        service = TestBed.inject(AuthenticationInterceptor);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

class TestConfigService extends ConfigurationService {
    constructor() {
        super({
            providers: {
                auth: {
                    address: 'http://localhost:8080/api',
                    authentication: 'Basic',
                    endpoints: {
                        login: 'http://localhost:8080/api/auth/login',
                        logout: 'http://localhost:8080/api/auth/logout'
                    }
                },
                resources: {
                    name: 'main',
                    address: 'http://localhost:8080/api',
                    format: 'json'
                }
            },
            views: {
                layout: 'empty',
                routes: {}
            },
            theme: {
                name: 'default',
                pallets: {
                    light: {
                        primary: 'blue'
                    },
                    dark: {
                        primary: 'blue'
                    }

                }
            },
            assets: []
        });
    }
}
