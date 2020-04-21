import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {AuthenticationMethodService} from '../authentication-method.service';
import {AuthenticationGuardService} from './authentication-guard.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {AuthenticationModule} from '../../authentication.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthenticationGuardService', () => {
    let service: AuthenticationGuardService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AuthenticationModule, RouterTestingModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigService},
                AuthenticationMethodService,
                AuthenticationService,
                AuthenticationGuardService
            ]});
        service = TestBed.inject(AuthenticationGuardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should resolve login path', () => {
        const test = new TestConfigService();
        expect(service.resolveLoginPath(test.get().views.routes, AuthenticationGuardService.LOGIN_COMPONENT)).toBe(null);
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
                routes: {
                    some_tasks: {
                        type: '',
                        layout: {
                            name: ''
                        },
                        access: 'private',
                        navigation: false,
                        routes: {
                            some_specifics: {
                                type: '',
                                layout: {
                                    name: ''
                                },
                                access: 'private',
                                navigation: true
                            }
                        }
                    }}
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
