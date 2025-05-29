import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {Credentials} from '../../../authentication/models/credentials';
import {Observable, of} from 'rxjs';
import {Identity} from '../../../identity/models/Identity';
import {Injectable} from '@angular/core';
import {AuthenticationMethodService} from "../../../authentication/services/authentication-method.service";
import {ConfigurationService} from "../../../configuration/configuration.service";
import {IdentityTransformer} from "../../../authentication/models/identity.transformer";
import {SessionService} from "../../../authentication/session/services/session.service";

@Injectable()
export class MockAuthenticationService extends AuthenticationService {

    constructor(protected _auth: AuthenticationMethodService,
                protected _config: ConfigurationService,
                protected _sessionService: SessionService,
                protected _userTransformer: IdentityTransformer) {
        super(_auth, _config, _sessionService, _userTransformer);
    }


    login(credentials: Credentials): Observable<Identity> {
        return of(new Identity('id', 'mail', 'firstname', 'lastname', 'activeActorId'));
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
