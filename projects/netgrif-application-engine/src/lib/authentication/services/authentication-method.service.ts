import Credentials from '../models/credentials';
import {User} from '../models/user';
import {Observable} from 'rxjs';

export abstract class AuthenticationMethodService {

    protected constructor() {
    }

    abstract login(credentials: Credentials): Observable<User>;

    abstract logout(): void;
}
