import {NetgrifApplicationEngine, Route} from './interfaces/schema';
import {Observable, of} from 'rxjs';

export abstract class ConfigurationService {

    protected constructor(private configuration: NetgrifApplicationEngine) {
    }

    public getAsync(): Observable<NetgrifApplicationEngine> {
        return of(this.get());
    }

    public get(): NetgrifApplicationEngine {
        return this.createConfigurationCopy();
    }

    /**
     * Get view configuration from nae.json for view at given path.
     * @param viewPath - path to requested view. No leading backslash.
     * @return requested configuration if it exists. `undefined` otherwise.
     */
    public getViewByPath(viewPath: string): Route | undefined {
        const pathFragments = viewPath.split('/');

        const config = this.createConfigurationCopy() as NetgrifApplicationEngine;
        if (!config.views || !config.views.routes) {
            return undefined;
        }
        let routes = config.views.routes;
        for (let i = 0; i < pathFragments.length; i++) {
            const pathFragment = pathFragments[i];
            const route = routes[pathFragment];
            if (!route) {
                return undefined;
            }
            if (i === pathFragments.length - 1) {
                return route;
            }
            if (!route.routes) {
                return undefined;
            }
            routes = route.routes;
        }
    }

    private createConfigurationCopy(): any {
        return JSON.parse(JSON.stringify(this.configuration));
    }
}
