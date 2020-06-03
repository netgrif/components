import {Type} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Views} from '../../configuration/interfaces/schema';
import {LoggerService} from '../../logger/services/logger.service';

/**
 * Holds information about views in the application. Can be used to resolve view component class objects from their names.
 * Can also be used to get unique ids for each view.
 */
export abstract class ViewService {

    /**
     * @ignore
     * Stores a mapping of component names to their classes
     */
    private _nameToClass: Map<string, Type<any>>;
    /**
     * Stores a mapping of web routes to unique view ids. Note that the view ids are independent of the Component at the given route.
     * So the same component can have multiple view ids based on it's location in the routing tree.
     */
    protected _webRouteToViewId: Map<string, string>;
    /**
     * The sequence that separates configuration path segments in unique ids
     */
    public readonly ID_DELIMITER = '/';

    /**
     * @param componentClasses Class objects of view components that should be dynamically routed
     * @param configService application's ConfigurationService
     * @param _logger application's logging service
     */
    protected constructor(componentClasses: Array<Type<any>>, configService: ConfigurationService, protected _logger: LoggerService) {
        this._nameToClass = new Map<string, Type<any>>();
        componentClasses.forEach(component => {
            this._nameToClass.set(component.name, component);
        });
        this._webRouteToViewId = new Map<string, string>();
        this._resolveViewIds(configService.get().views);
    }

    /**
     * @param componentClassName class name of a view component
     * @returns the Class object with the provided name or `null` if such name is not registered
     */
    public resolveNameToClass(componentClassName: string): Type<any> | null {
        return this._nameToClass.get(componentClassName);
    }

    /**
     * @param views views with a common parent in the nae.json configuration tree
     * @param commonIdPrefix the unique common prefix of the provided views
     * @param parentRoute the route prefix for the provided views
     */
    protected _resolveViewIds(views: Views, commonIdPrefix?: string, parentRoute?: string): void {
        Object.keys(views).forEach(viewKey => {
            const view = views[viewKey];
            if (!view.routing || !view.routing.path) {
                this._logger.warn('A view in nae.json configuration misses routing parameter. No ID will be generated for this view.');
                return; // skip this view
            }
            const currentRoute = (!!parentRoute && parentRoute.length > 0 ? `${parentRoute}/` : '') + view.routing.path;
            const currentId = (!!commonIdPrefix ? `${commonIdPrefix}${this.ID_DELIMITER}` : '') + viewKey;
            this._webRouteToViewId.set(currentRoute, currentId);
            if (!!view.children) {
                this._resolveViewIds(view.children, currentId, currentRoute);
            }
        });
    }
}
