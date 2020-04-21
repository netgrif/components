import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BasicAuthenticationService} from './basic-authentication.service';
import {AuthenticationModule} from '../../../authentication.module';
import {AuthenticationMethodService} from '../../authentication-method.service';
import {Credentials} from '../../../models/credentials';
import {Observable, of} from 'rxjs';
import {User} from '../../../models/user';

describe('BasicAuthenticationService', () => {
    let service: BasicAuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AuthenticationModule, HttpClientTestingModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigService},
                {provide: AuthenticationMethodService, useClass: MyAuth},
                HttpClient,
                BasicAuthenticationService
            ]});
        service = TestBed.inject(BasicAuthenticationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should logout', () => {
        expect(service.logout().subscribe()).toBeTruthy();
    });

    it('should login', () => {
        expect(service.login({username: '', password: ''}).subscribe()).toBeTruthy();
    });
});

class MyAuth extends AuthenticationMethodService {
    login(credentials: Credentials): Observable<User> {
        return of(undefined);
    }

    logout(): Observable<object> {
        return of(undefined);
    }
}

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
