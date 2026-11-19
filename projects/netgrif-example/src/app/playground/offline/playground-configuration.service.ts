import {Injectable} from '@angular/core';
import {ConfigurationService, NetgrifApplicationEngine} from '@netgrif/components-core';
import {NAVIGATION_ROUTE} from '../mock-engine/mock-navigation';

/**
 * Address of the (non-existent) engine. Every request to it is answered by {@link OfflineHttpInterceptor}.
 */
export const OFFLINE_ENGINE_ADDRESS = 'http://offline.playground/api/';

/**
 * Minimal configuration, the playground runs without Netgrif Application Engine and without login.
 */
@Injectable()
export class PlaygroundConfigurationService extends ConfigurationService {
    constructor() {
        super({
            extends: 'nae-default',
            providers: {
                auth: {
                    address: OFFLINE_ENGINE_ADDRESS,
                    authentication: 'Basic',
                    endpoints: {
                        login: 'auth/login', logout: 'auth/logout',
                        // account forms (mock engine: token "valid-token", current password "password")
                        signup: 'auth/signup', verify: 'auth/token/verify', invite: 'auth/invite', reset: 'auth/reset',
                        recover: 'auth/recover', changePassword: 'auth/changePassword',
                    },
                    sessionBearer: 'X-Auth-Token',
                    sessionTimeoutEnabled: false,
                    sessionTimeout: 900,
                },
                resources: ['case', 'task', 'petrinet', 'user', 'dashboard', 'filter', 'uri', 'impersonation'].map(name => ({
                    name,
                    address: OFFLINE_ENGINE_ADDRESS,
                    format: 'json',
                })),
            },
            views: {},
            theme: {
                name: 'default',
                pallets: {light: {primary: {}, secondary: {}}, dark: {primary: {}, secondary: {}}},
            },
            assets: [],
            filters: {},
            i18n: ['en', 'sk', 'de'],
            services: {
                // no login view; the guards of the navigation (RoleGuardService, ...) need a login path
                auth: {toLoginRedirect: '/'},
                dataFields: {},
                // links of the legal notice of the account forms
                legal: {termsOfService: 'https://netgrif.com/', privacyPolicy: 'https://netgrif.com/'},
                // routes of the menu items of the double drawer / dashboard (`/<route>/<base64 item id>`)
                groupNavigation: {groupNavigationRoute: NAVIGATION_ROUTE},
            },
        } as unknown as NetgrifApplicationEngine);
    }
}
