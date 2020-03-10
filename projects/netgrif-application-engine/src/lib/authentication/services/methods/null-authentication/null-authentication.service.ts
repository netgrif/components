import {Injectable} from '@angular/core';
import {AuthenticationMethodService} from '../../authentication-method.service';
import Credentials from '../../../models/credentials';
import {Observable, of} from 'rxjs';
import {User} from '../../../models/user';

@Injectable()
export class NullAuthenticationService extends AuthenticationMethodService {

    constructor() {
        super();
    }

    login(credentials: Credentials): Observable<User> {
        return of(null);
    }

    logout(): Observable<object> {
        return of({});
    }
}
