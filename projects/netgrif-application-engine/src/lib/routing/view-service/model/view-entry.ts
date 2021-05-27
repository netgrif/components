import {Type} from '@angular/core';

/**
 * Used by the {@link ViewService} to store information about the individual views in the application, alongside their identifiers.
 */
export interface ViewEntry {
    /**
     * Used by the application to uniquely identify the view
     */
    id: string;
    /**
     * The Component class of the view
     */
    class: Type<any>;
}
