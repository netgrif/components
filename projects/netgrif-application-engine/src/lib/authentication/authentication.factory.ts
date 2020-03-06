import {ConfigurationService} from '../configuration/configuration.service';
import {NullAuthenticationService} from './null-authentication/null-authentication.service';
import {BasicAuthenticationService} from './basic-authentication/basic-authentication.service';
import {HttpClient} from '@angular/common/http';

export function authenticationServiceFactory(config: ConfigurationService, http: HttpClient) {
    const auth = config.get().providers.auth;
    if (!auth || !auth.authentication) {
        return new NullAuthenticationService();
    }

    const authType = auth.authentication.toLowerCase();
    if (authType === 'basic') {
        return new BasicAuthenticationService(http);
    }
}
