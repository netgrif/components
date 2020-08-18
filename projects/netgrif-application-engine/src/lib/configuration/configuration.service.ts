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

    /**
     * Get all URLs/paths of views with specified layout.
     * @param layout Search views with this layout
     * @returns Paths with prefixed '/' of all views with specified layout, empty array otherwise.
     */
    public getPathsByView(layout: string): Array<string> {
        const config = this.createConfigurationCopy() as NetgrifApplicationEngine;
        const result = [];
        if (!config.views) {
            return result;
        }
        Object.values(config.views).forEach(view => {
            result.push(...this.getView(layout, view).map(path => '/' + path));
        });

        return result;
    }

    private getView(searched: string, view: View): Array<string> {
        const paths = [];
        if (!!view.layout && view.layout.name === searched) {
            paths.push(view.routing.path);
        }
        if (view.children && Object.keys(view.children).length !== 0) {
            Object.values(view.children).forEach(child => {
                paths.push(...this.getView(searched, child).map(path => view.routing.path + '/' + path));
            });
        }
        return paths;
    }

    private createConfigurationCopy(): any {
        return JSON.parse(JSON.stringify(this.configuration));
    }
}
