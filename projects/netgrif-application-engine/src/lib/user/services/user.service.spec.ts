import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            AuthenticationMethodService,
            {provide: ConfigurationService, useClass: TestConfigService}
        ]
    });
    service = TestBed.inject(UserService);
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
