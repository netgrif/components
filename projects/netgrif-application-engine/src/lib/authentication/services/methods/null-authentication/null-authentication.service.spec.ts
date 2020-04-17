import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationModule} from '../../../authentication.module';
import {NullAuthenticationService} from './null-authentication.service';

describe('NullAuthenticationService', () => {
    let service: NullAuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AuthenticationModule, HttpClientTestingModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigService},
                HttpClient,
                NullAuthenticationService
            ]});
        service = TestBed.inject(NullAuthenticationService);
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
