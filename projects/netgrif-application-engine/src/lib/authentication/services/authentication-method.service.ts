import {Observable} from 'rxjs';
import {Credentials} from '../models/credentials';
import {UserResource} from '../../resources/interface/user-resource';

export abstract class AuthenticationMethodService {

    protected constructor() {
    }

    abstract login(credentials: Credentials): Observable<UserResource>;

    abstract logout(): Observable<object>;
}
