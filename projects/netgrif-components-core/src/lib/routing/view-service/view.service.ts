import {Type} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';
import {LoggerService} from '../../logger/services/logger.service';
import {Router} from '@angular/router';
import {ViewEntry} from './model/view-entry';

/**
 * Holds information about views in the application. Can be used to resolve view component class objects from their names.
 */
export abstract class ViewService {

    /**
     * @ignore
     * Stores a mapping of component names to their classes
     */
    private _nameToClass: Map<string, Type<any>>;

    /**
     * @param componentClasses Class objects of view components that should be dynamically routed.
     * Prefer `{id: 'MyViewComponent', class: MyViewComponent}` entries: a bare class is registered under its runtime
     * `name`, which is mangled by minification (production builds), so nae.json `componentName` wouldn't match it.
     * @param configService application's ConfigurationService
     * @param _router the application's Router
     * @param _logger application's logging service
     */
    protected constructor(componentClasses: Array<Type<any> | ViewEntry>,
                          // TODO 29.4.2021 - remove unused class attributes
                          configService: ConfigurationService,
                          protected _router: Router,
                          protected _logger: LoggerService) {
        this._nameToClass = new Map<string, Type<any>>();
        componentClasses.forEach(component => {
            if (component instanceof Type) {
                this._logger?.warn(`View component '${component.name}' is registered without an id, its class name may change`
                    + ` in a minified build. Register it as {id: '<ComponentName>', class: <ComponentName>}.`);
                this._nameToClass.set(component.name, component);
            } else {
                this._nameToClass.set(component.id, component.class);
            }
        });
    }

    /**
     * @param componentClassName class name of a view component
     * @returns the Class object with the provided name or `null` if such name is not registered
     */
    public resolveNameToClass(componentClassName: string): Type<any> | undefined {
        return this._nameToClass.get(componentClassName);
    }
}
