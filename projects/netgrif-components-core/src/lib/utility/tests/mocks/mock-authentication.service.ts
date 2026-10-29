import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {Credentials} from '../../../authentication/models/credentials';
import {Observable, of} from 'rxjs';
import {User} from '../../../user/models/user';
import {Injectable} from '@angular/core';
import {AuthenticationMethodService} from "../../../authentication/services/authentication-method.service";
import {ConfigurationService} from "../../../configuration/configuration.service";
import {UserTransformer} from "../../../authentication/models/user.transformer";
import {SessionService} from "../../../authentication/session/services/session.service";
import {TabPersistenceService} from '../../../tabs/services/tab-persistence.service';

@Injectable()
export class MockAuthenticationService extends AuthenticationService {

    constructor(protected _auth: AuthenticationMethodService,
                protected _config: ConfigurationService,
                protected _sessionService: SessionService,
                protected _userTransformer: UserTransformer,
                protected _tabSessionPersistence: TabPersistenceService) {
        super(_auth, _config, _sessionService, _userTransformer, _tabSessionPersistence);
    }


    login(credentials: Credentials): Observable<User> {
        return of(new User('id', 'username', 'mail', 'realmId', 'name', 'surname', ['ADMIN'], [{stringId: 'id', name: 'id', importId: 'id'}]));
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
