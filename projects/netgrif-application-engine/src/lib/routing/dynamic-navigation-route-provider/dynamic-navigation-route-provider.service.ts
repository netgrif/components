import {Injectable} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';

@Injectable({
    providedIn: 'root'
})
export class DynamicNavigationRouteProviderService {

    protected _route: string | undefined;

    constructor(protected _config: ConfigurationService) {
    }

    public set route(route: string) {
        this._route = route;
    }

    /**
     * @Returns the configuration set by the {@link RoutingBuilderService} or if dynamic navigation is not used the value set in the
     * nae.json
     */
    public get route(): string {
        if (this._route !== undefined) {
            return this._route;
        }
        return this._config.getServicesConfiguration()?.groupNavigation?.groupNavigationRoute;
    }
}
