import {ConfigurationService} from '../configuration/configuration.service';
import {NullAuthenticationService} from './services/methods/null-authentication/null-authentication.service';
import {BasicAuthenticationService} from './services/methods/basic-authentication/basic-authentication.service';
import {HttpClient} from '@angular/common/http';
import {BasicWithRealmAuthenticationService} from "./services/methods/basic-authentication/basic-with-realm-authentication.service";

export function authenticationServiceFactory(config: ConfigurationService, http: HttpClient) {
    const auth = config.get().providers.auth;
    if (!auth || !auth.authentication) {
        return new NullAuthenticationService();
    }

    const authType = auth.authentication.toLowerCase();
    if (authType === 'basic') {
        return new BasicAuthenticationService(http, config);
    } else if (authType === 'basicwithrealm') {
        return new BasicWithRealmAuthenticationService(http, config);
    } else {
        return new NullAuthenticationService();
    }
}
