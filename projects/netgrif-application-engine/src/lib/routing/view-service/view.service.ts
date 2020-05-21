import {Type} from '@angular/core';

/**
 * Used by the {@link DynamicRoutingService} to resolve view names to their component class objects.
 */
export abstract class ViewService {

    private _nameToClass: Map<string, Type<any>>;

    /**
     * @param componentClasses Class objects of view components that should be dynamically routed
     */
    protected constructor(componentClasses: Array<Type<any>>) {
        this._nameToClass = new Map<string, Type<any>>();
        componentClasses.forEach(component => {
            this._nameToClass.set(component.name, component);
        });
    }

    /**
     * @param componentClassName class name of a view component
     * @returns the Class object with the provided name or `null` if such name is not registered
     */
    public resolveNameToClass(componentClassName: string): Type<any> | null {
        return this._nameToClass.get(componentClassName);
    }
}
