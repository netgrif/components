import {User} from '../models/user';
import {Observable} from 'rxjs';
import {Credentials} from '../models/credentials';

export abstract class AuthenticationMethodService {

    protected constructor() {
    }

    abstract login(credentials: Credentials): Observable<User>;

    abstract logout(): Observable<object>;
}
