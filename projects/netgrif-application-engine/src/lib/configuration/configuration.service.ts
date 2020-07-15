import {NetgrifApplicationEngine, View} from './interfaces/schema';
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
     * Get view configuration from nae.json for view at given config path.
     * @param viewConfigPath configuration path to the requested view. No leading backslash.
     * @return requested configuration if it exists. `undefined` otherwise.
     */
    public getViewByPath(viewConfigPath: string): View | undefined {
        const pathFragments = viewConfigPath.split('/');

        const config = this.createConfigurationCopy() as NetgrifApplicationEngine;
        if (!config.views) {
            return undefined;
        }
        let views = config.views;
        for (let i = 0; i < pathFragments.length; i++) {
            const pathFragment = pathFragments[i];
            const view = views[pathFragment];
            if (!view) {
                return undefined;
            }
            if (i === pathFragments.length - 1) {
                return view;
            }
            if (!view.children) {
                return undefined;
            }
            views = view.children;
        }
    }

    private createConfigurationCopy(): any {
        return JSON.parse(JSON.stringify(this.configuration));
    }
}
