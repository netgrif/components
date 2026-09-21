import {Observable, of} from 'rxjs';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {Credentials} from '../../../authentication/models/credentials';
import {UserResource} from '../../../resources/interface/user-resource';

export class MockAuthenticationMethodService extends AuthenticationMethodService {
    login(credentials: Credentials): Observable<UserResource> {
        return of({email: 'mail', id: 'id', username: 'username', realmId: 'realmId', name: 'name', firstName: 'name', surname: 'surname', lastName: 'surname', fullName: 'name surname',
            groups: [], authorities: [], nextGroups: [], processRoles: []});
    }

    logout(): Observable<object> {
        return of(undefined);
    }
}
