import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {Credentials} from '../../../authentication/models/credentials';
import {Observable, of} from 'rxjs';
import {User} from '../../../user/models/user';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MockAuthenticationService extends AuthenticationService {
    login(credentials: Credentials): Observable<User> {
        return of(new User('id', 'mail', 'name', 'surname', ['ADMIN'], [{stringId: 'id', name: 'id', importId: 'id'}]));
    }

    logout(): Observable<object> {
        return of(undefined);
    }

     get isAuthenticated(): boolean {
        return true;
    }

    get authenticated$(): Observable<boolean> {
        return of(true);
    }
}
