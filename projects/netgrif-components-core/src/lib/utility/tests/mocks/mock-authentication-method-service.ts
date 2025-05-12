import {Observable, of} from 'rxjs';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {Credentials} from '../../../authentication/models/credentials';
import {IdentityResource} from '../../../resources/interface/identity-resource';

export class MockAuthenticationMethodService extends AuthenticationMethodService {
    login(credentials: Credentials): Observable<IdentityResource> {
        return of({username: 'mail', id: 'id', firstname: 'name', lastname: 'surname', fullName: 'name surname', activeActorId: 'actorId'});
    }

    logout(): Observable<object> {
        return of(undefined);
    }
}
