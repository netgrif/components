import {NetgrifApplicationEngine, Services, View, Views} from '../../commons/schema';
import {Observable, of} from 'rxjs';

export abstract class ConfigurationService {

    private readonly _dataFieldConfiguration: Services['dataFields'];

    protected constructor(protected configuration: NetgrifApplicationEngine) {
        this.resolveEndpointURLs();
        this._dataFieldConfiguration = this.getConfigurationSubtree(['services', 'dataFields']);
    }

    public getAsync(): Observable<NetgrifApplicationEngine> {
        return of(this.get());
    }

    /**
     * Calls to this method should be avoided as creating a deep copy of the configuration has a large overhead
     *
     * @returns a deep copy of the entire configuration object
     */
    public get(): NetgrifApplicationEngine {
        return this.createConfigurationCopy();
    }

    /**
     * Get view configuration from nae.json for view at given config path.
     * @param viewConfigPath configuration path to the requested view. No leading backslash.
     * @return requested configuration if it exists. `undefined` otherwise.
     */
    public getViewByPath(viewConfigPath: string): View | undefined {
        const viewPathSegments = viewConfigPath.split('/');
        const configTreePathSegments = ['views'];
        for (let i = 0; i < viewPathSegments.length; i++) {
            if (i > 0) {
                configTreePathSegments.push('children');
            }
            configTreePathSegments.push(viewPathSegments[i]);
        }
        return this.getConfigurationSubtree(configTreePathSegments);
    }

    /**
     * Get view configuration from nae.json for view at given url.
     * @param url to the requested view. Necessary backslash.
     * @return requested configuration if it exists. `undefined` otherwise.
     */
    public getViewByUrl(url: string): View | undefined {
        const views = this.getViewsCopy();
        if (!views) {
            return undefined;
        }
        let map: Map<string, View> = new Map();
        map = this.getChildren(views, map, '');
        if (map.get(url) === undefined) {
            for (const [key, value] of map) {
                if (key.includes('/**') && url.includes(key.split('/**')[0]))
                    return value;
            }
        }
        return map.get(url);
    }

    private getChildren(views: Views, map: Map<string, View>, prefix: string): Map<string, View> {
        Object.keys(views).forEach(view => {
            if (!!views[view].routing.path) {
                prefix = prefix.charAt(prefix.length - 1) === '/' ?
                    prefix.length > 1 ? prefix.substring(0, prefix.length - 2) : '' :
                    prefix;
                const viewPath = views[view].routing.path.charAt(0) === '/' ?
                    views[view].routing.path.length > 1 ? views[view].routing.path.substring(1) : '' :
                    views[view].routing.path;
                map.set(
                    views[view].routing.match ?
                        prefix + '/' + viewPath + '/**' :
                        prefix + '/' + viewPath,
                    views[view]);
            }
            if (views[view].children) {
                this.getChildren(views[view].children, map, prefix + '/' + views[view].routing.path);
            }
        });
        return map;
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

    /**
     * @param pathSegments the keys specifying the path trough the configuration that should be accessed
     * @returns a deep copy of a specified subsection of the configuration object, or `undefined` if such subsection doesn't exist.
     * Calling this method with an empty array as argument is equivalent to calling the [get()]{@link ConfigurationService#get} method.
     */
    public getConfigurationSubtree(pathSegments: Array<string>): any | undefined {
        let root = this.configuration;
        for (const segment of pathSegments) {
            if (root[segment] === undefined) {
                return undefined;
            }
            root = root[segment];
        }
        return this.deepCopy(root);
    }

    /**
     * @returns the appropriate template configuration for data fields, or `undefined` if such configuration is not present.
     */
    public getDatafieldConfiguration(): Services['dataFields'] | undefined {
        if (this._dataFieldConfiguration === undefined) {
            return undefined;
        }
        return {...this._dataFieldConfiguration};
    }

    /**
     * Resolves the URL addresses of backend endpoints based on the provided configuration.
     *
     * If the URLs begin with either `http://`, or `https://` the provided URL will be used.
     *
     * If not, then the URLs are considered to be relative to the location of the frontend application and it's URL will be used
     * as the base path. `/api` is appended automatically.
     */
    protected resolveEndpointURLs() {
        if (this.configuration?.providers?.auth?.address === undefined) {
            throw new Error(`'provider.auth.address' is a required property and must be present in the configuration!`);
        }
        this.configuration.providers.auth.address = this.resolveURL(this.configuration.providers.auth.address);

        if (this.configuration?.providers?.resources === undefined) {
            throw new Error(`'provider.resources' is a required property and must be present in the configuration!`);
        }
        if (Array.isArray(this.configuration.providers.resources)) {
            this.configuration.providers.resources.forEach(resource => {
                if (resource?.address === undefined) {
                    throw new Error(`Resources defined in 'provider.resources' must define an address property!`);
                }
                resource.address = this.resolveURL(resource.address);
            });
        } else {
            if (this.configuration?.providers?.resources?.address === undefined) {
                throw new Error(`Resources defined in 'provider.resources' must define an address property!`);
            }
            this.configuration.providers.resources.address = this.resolveURL(this.configuration.providers.resources.address);
        }
    }

    /**
     * Resolves a single URL address.
     *
     * If the URL begins with either `http://`, or `https://` the provided URL will be used.
     *
     * If not, then the URL is considered to be relative to the location of the frontend application and it's URL will be used
     * as the base path. `/api` is appended automatically.
     *
     * @param configURL value from the configuration file
     * @returns the resolved URL
     */
    protected resolveURL(configURL: string): string {
        if (configURL.startsWith('http://') || configURL.startsWith('https://')) {
            return configURL;
        } else {
            return location.origin + '/api' + configURL;
        }
    }

    /**
     * @returns the services configuration, or `undefined` if such configuration is not present.
     */
    public getServicesConfiguration(): Services | undefined {
        const subtree = this.getConfigurationSubtree(['services']) as Services;
        return subtree !== undefined ? this.deepCopy(subtree) as Services : undefined;
    }

    /**
     * @returns the value stored in the [onLogoutRedirect]{@link Services#auth.onLogoutRedirect} attribute if defined.
     * If not and the deprecated attribute [logoutRedirect]{@link Services#auth.logoutRedirect} is defined then its value is returned.
     * Otherwise, `undefined` is returned.
     */
    public getOnLogoutPath(): string | undefined {
        return this.configuration?.services?.auth?.onLogoutRedirect ?? this.configuration?.services?.auth?.logoutRedirect;
    }

    /**
     * @returns the value stored in the [toLoginRedirect]{@link Services#auth.toLoginRedirect} attribute if defined.
     * If not and the deprecated attribute [loginRedirect]{@link Services#auth.loginRedirect} is defined then its value is returned.
     * Otherwise, `undefined` is returned.
     */
    public getToLoginPath(): string | undefined {
        return this.configuration?.services?.auth?.toLoginRedirect ?? this.configuration?.services?.auth?.loginRedirect;
    }

    /**
     * @returns the value stored in the [onLoginRedirect]{@link Services#auth.onLoginRedirect} attribute if defined.
     * Otherwise, `undefined` is returned.
     */
    public getOnLoginPath(): string | undefined {
        return this.configuration?.services?.auth?.onLoginRedirect;
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
        return this.deepCopy(this.configuration);
    }

    private getViewsCopy(): Views {
        return this.getConfigurationSubtree(['views']) as Views;
    }

    private deepCopy(obj: object): object {
        return JSON.parse(JSON.stringify(obj));
    }
}
