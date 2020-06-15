import {Type} from '@angular/core';

/**
 * An interface that unites the common public methods of ViewService classes.
 */
export interface ViewServiceInterface {
    /**
     * @param componentClassName class name of a view component
     * @returns the Class object with the provided name or `null` if such name is not registered
     */
    resolveNameToClass(componentClassName: string): Type<any> | null;
    /**
     * @returns the unique ID of the view that is currently displayed.
     * If no ID was resolved for the current view `undefined` will be returned.
     *
     * Note that the ID only attempts to be unique. Routing with empty paths creates collisions and so multiple
     * views can end up having the same "unique" ID. If this proves to be a problem you can override the
     * [resolveViewIds]{@link ViewService#_resolveViewIds} method and change the way view IDs are resolved in your application.
     */
    getViewId(): string | undefined;
}
