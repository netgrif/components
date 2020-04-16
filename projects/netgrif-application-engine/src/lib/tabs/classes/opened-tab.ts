import {TabContent, TabLabel} from '../interfaces';
import {ComponentPortal} from '@angular/cdk/portal';
import {Type} from '@angular/core';

/**
 * Holds the information of tab opened in a tab view.
 *
 * See {@link TabGroup} for more information.
 */
export class OpenedTab implements TabContent {

    /**
     * See {@link TabContent#label}.
     */
    public label: TabLabel;
    /**
     * See [TabContent.canBeClosed]{@link TabContent#canBeClosed}.
     */
    public canBeClosed: boolean;
    /**
     * See [TabContent.tabContentComponent]{@link TabContent#tabContentComponent}.
     */
    public tabContentComponent: Type<any>;
    /**
     * See [TabContent.injectedObject]{@link TabContent#injectedObject}.
     */
    public injectedObject: object = {};
    /**
     * See [TabContent.order]{@link TabContent#order}.
     */
    public order = 0;
    /**
     * @ignore
     * Reference to the component portal that is used to display the tab content
     */
    public portal: ComponentPortal<any>;
    /**
     * @ignore
     * Whether the tab was initialized after it's creation.
     *
     * See [TabGroup.initializeTab()]{@link TabGroup#initializeTab} for more information.
     */
    public isTabInitialized = false;

    /**
     * @param tabContent - content of the tab
     * @param uniqueId - unique identifier for the tab
     */
    constructor(tabContent: TabContent, public uniqueId: string) {
        Object.assign(this, tabContent);
    }
}
