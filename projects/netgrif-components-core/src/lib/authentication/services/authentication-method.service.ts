import {Observable} from 'rxjs';
import {Credentials} from '../models/credentials';
import {IdentityResource} from '../../resources/interface/identity-resource';

export abstract class AuthenticationMethodService {

    constructor() {
    }

    abstract login(credentials: Credentials): Observable<IdentityResource>;

    abstract logout(): Observable<object>;
}
