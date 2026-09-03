import {Observable, of} from 'rxjs';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {Credentials} from '../../../authentication/models/credentials';
import {UserResource} from '../../../resources/interface/user-resource';
import {Injectable} from "@angular/core";

@Injectable()
export class MockAuthenticationMethodService extends AuthenticationMethodService {
    login(credentials: Credentials): Observable<UserResource> {
        return of({email: 'mail', id: 'id', name: 'name', surname: 'surname', fullName: 'name surname',
            groups: [], authorities: [], nextGroups: [], processRoles: []});
    }

    logout(): Observable<object> {
        return of(undefined);
    }
}
