import {ViewServiceInterface} from './view-service-interface';
import {ViewService} from './view.service';
import {Type} from '@angular/core';

/**
 * Implementation of {@link ViewService} that returns a single value for every call to the [getViewId]{@link ViewServiceInterface#getViewId}
 * method, regardless of it's router path.
 *
 * It is used in {@link TabView} to provide unique IDs for each initially opened tab.
 */
export class FixedIdViewService implements ViewServiceInterface {
    /**
     * @param viewId viewID that should be returned by this instance
     * @param viewService service that provides the rest of this class' functionality
     */
    constructor(private readonly viewId: string, private viewService: ViewService) {
    }

    /**
     *  @returns always the same view Id. The value that is returned is set during this object's construction.
     */
    getViewId(): string | undefined {
        return this.viewId;
    }

    /**
     * See [resolveNameToClass]{@link ViewService#resolveNameToClass} for information about this method.
     */
    resolveNameToClass(componentClassName: string): Type<any> | null {
        return this.viewService.resolveNameToClass(componentClassName);
    }

}
