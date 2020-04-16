import {Type} from '@angular/core';

/**
 * Stores information about content of one opened tab in tab view.
 *
 * See {@link TabView} for more information about the usage of this interface.
 */
export interface TabContent {
    /**
     * Contents of the tab label.
     *
     * Only attributes with defined values are displayed in the label.
     * You can have both icon and text displayed, either one, or neither.
     * Icon is displayed in front of the text.
     */
    label?: TabLabel;
    /**
     * A close button will be displayed after the text in the label if the tab can be closed.
     */
    canBeClosed: boolean;
    /**
     * Class name of the Component that should be displayed as the tab content.
     */
    tabContentComponent: Type<any>;
    /**
     * Data that you want to make available for injection to the tab content component.
     *
     * The data can be injected trough the `NAE_TAB_DATA` injection token.
     *
     * See [InjectedTabData]{@link InjectedTabData} for more information about the format of the injected object.
     */
    injectedObject?: object;
    /**
     * Determines the natural ordering of the tabs.
     *
     * Tabs are ordered from left to right in ascending order.
     * If two tabs have the same order the one that was created later will appear further to the right.
     *
     * Defaults to `0`.
     */
    order?: number;
}


/**
 * Stores information about the label of a tab in tab view.
 *
 * See {@link TabContent#label} for more information.
 */
export interface TabLabel {
    /**
     * Material design icon name.
     *
     * See [material website]{@link https://material.io/resources/icons} for supported icon list.
     */
    icon?: string;
    /**
     * Tab name that is displayed in it's label.
     */
    text?: string;
}


/**
 * The base interface for data injected into tabs.
 * This information is made available for injection to any tab content component trough the `NAE_TAB_DATA` injection token.
 * If {@link TabContent} has the `injectedObject` defined, then that data is provided as well.
 * Should there be a key conflict in the objects, then values from this interface take precedence and replace the provided data.
 */
export interface InjectedTabData {
    /**
     * Uniquely identifies the tab within the tab view.
     */
    tabUniqueId: string;
    /**
     * Reference to the parent tab view allowing some control over it from the tab content component.
     */
    tabViewRef: TabViewInterface;
}


/**
 * Methods of parent tab view, that tabs can access.
 */
export interface TabViewInterface {
    /**
     * Opens a new tab with the provided content.
     * @param tabContent - content of the new tab
     * @param autoswitch - whether the newly opened tab should be switched to. Defaults to `false`.
     * @returns the `tabUniqueId` of the newly opened tab
     */
    openTab(tabContent: TabContent, autoswitch?: boolean): string;

    /**
     * Switches to a tab with the given `index`. Throws an error if the `index` is invalid.
     * @param index - index of the tab that should be switched to
     */
    switchToTabIndex(index: number): void;

    /**
     * Switches to a tab with the given `uniqueId`. Throws an error if the `uniqueId` is invalid.
     * @param uniqueId - id of the tab that should be switched to
     */
    switchToTabUniqueId(uniqueId: string): void;

    /**
     * Closes the tab with the given `index`. Throws an error if the `index` is invalid.
     * Throws an error if the tab has it's `canBeClosed` property set to `false`.
     * @param index - index of the tab that should be closed
     */
    closeTabIndex(index: number): void;

    /**
     * Closes the tab with the given `uniqueId`. Throws an error if the `uniqueId` is invalid.
     * Throws an error if the tab has it's `canBeClosed` property set to `false`.
     * @param uniqueId - id of the tab that should be closed
     */
    closeTabUniqueId(uniqueId: string): void;
}
