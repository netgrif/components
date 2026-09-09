import {Observable, throwError} from 'rxjs';
import {Credentials} from '../models/credentials';
import {UserResource} from '../../resources/interface/user-resource';

export abstract class AuthenticationMethodService {

    constructor() {
    }

    abstract login(credentials: Credentials): Observable<UserResource>;

    loginWithApiToken(_token: string, _realmId?: string): Observable<UserResource> {
        return throwError(new Error('API token authentication is not supported by this authentication method'));
    }

    abstract logout(): Observable<object>;
}
