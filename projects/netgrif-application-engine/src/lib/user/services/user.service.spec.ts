import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Credentials} from '../../authentication/models/credentials';
import {Observable, of} from 'rxjs';
import {User} from '../../authentication/models/user';
import {TestConfigurationService} from '../../utility/tests/test-config';

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthenticationMethodService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MyAuth},
            ]
        });
        service = TestBed.inject(UserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login', () => {
        service.login({password: '', username: ''}).subscribe(res => {
            expect(res.id).toEqual('id');
        });
    });

    it('should logout', () => {
        service.logout().subscribe(res => {
            expect(res).toEqual(undefined);
        });
    });

    it('should check authorities and roles', () => {
        expect(service.hasRole({id: 'id', name: 'id'})).toBeFalse();
        expect(service.hasAuthority('ADMIN')).toBeFalse();
        expect(service.hasRoleById('id')).toBeFalse();
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
