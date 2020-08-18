import {TestBed} from '@angular/core/testing';
import {AuthenticationService} from './authentication.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {AuthenticationMethodService} from '../authentication-method.service';
import {Credentials} from '../../models/credentials';
import {Observable, of} from 'rxjs';
import {User} from '../../models/user';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MyAuth},
            ]});
        service = TestBed.inject(AuthenticationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should logout', () => {
        service.logout().subscribe(res => {
            expect(res).toEqual(undefined);
        });
    });

    it('should login', () => {
        service.login({username: '', password: ''}).subscribe( res => {
            expect(res.id).toEqual('id');
            expect(service.isAuthenticated).toBe(true);
        });
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

class MyAuth extends AuthenticationMethodService {
    login(credentials: Credentials): Observable<User> {
        return of({email: 'mail', id: 'id', name: 'name', surname: 'surname'});
    }

    logout(): Observable<object> {
        return of(undefined);
    }
}
