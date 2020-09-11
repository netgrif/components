import {Observable, of} from 'rxjs';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {Credentials} from '../../../authentication/models/credentials';
import {User} from '../../../authentication/models/user';

export class MockAuthenticationMethodService extends AuthenticationMethodService {
    login(credentials: Credentials): Observable<User> {
        return of({email: 'mail', id: 'id', name: 'name', surname: 'surname'});
    }

    logout(): Observable<object> {
        return of(undefined);
    }
}
