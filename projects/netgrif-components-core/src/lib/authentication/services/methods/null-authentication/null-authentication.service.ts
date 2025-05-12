import {Injectable} from '@angular/core';
import {AuthenticationMethodService} from '../../authentication-method.service';
import {Credentials} from '../../../models/credentials';
import {Observable, of} from 'rxjs';
import {IdentityResource} from '../../../../resources/interface/identity-resource';

@Injectable()
export class NullAuthenticationService extends AuthenticationMethodService {

    constructor() {
        super();
    }

    login(credentials: Credentials): Observable<IdentityResource> {
        return of(null);
    }

    logout(): Observable<object> {
        return of({});
    }
}
