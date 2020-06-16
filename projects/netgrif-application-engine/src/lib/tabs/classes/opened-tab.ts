import {TabContent, TabLabel} from '../interfaces';
import {ComponentPortal} from '@angular/cdk/portal';
import {Type} from '@angular/core';
import {FixedIdViewService} from '../../routing/view-service/fixed-id-view.service';

/**
 * Holds the information of tab opened in a tab view.
 *
 * See {@link TabView} for more information.
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
     * See [TabContent.initial]{@link TabContent#initial}.
     */
    public initial = false;
    /**
     * @ignore
     * Reference to the component portal that is used to display the tab content
     */
    public portal: ComponentPortal<any>;
    /**
     * @ignore
     * Whether the tab was initialized after it's creation.
     *
     * See [TabGroup.initializeTab()]{@link TabView#initializeTab} for more information.
     */
    public isTabInitialized = false;
    /**
     * @ignore
     * This tab's ViewService instance that provides it with its own unique view ID.
     * It is only present for tabs that are defined in the initial array in application's config.
     */
    public tabViewService?: FixedIdViewService;

    /**
     * @param tabContent - content of the tab
     * @param uniqueId - unique identifier for the tab
     */
    constructor(tabContent: TabContent, public uniqueId: string) {
        Object.assign(this, tabContent);
    }
}
