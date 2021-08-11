import {Type} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

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
    /**
     * Whether the tab was initially opened. Only initially opened tabs have their view ID defined.
     * Tabs that are opened dynamically don't have a view ID and thus cannot save their state into user preferences.
     *
     * This attribute is only used when initial tabs are created. The [openTab]{@link TabView#openTab} method ignores this attribute
     * and logs a warning if it is set on the provided object.
     */
    initial?: boolean;
    /**
     * When we need to know, tho which tab we need to switch when we close current tab, we need a parent unique id, its
     * a unique ID of tab, from which we open current tab. Initial tabs and case tabs dont have those property.
     */
    parentUniqueId?: string;
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
     *
     * The text is passed trough the translate pipe. If you want the tab label to be translated simply pass the translation key as value.
     */
    text?: string;
    /**
     * Tab count is displayed in it's label, ich stream is provided
     */
    count?: ReplaySubject<number>;
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
    /**
     * `true` is emitted into this stream when the tab is switched into.
     *
     * `false` is emitted into this stream when the tab is switched away from.
     */
    tabSelected$: Observable<boolean>;
    /**
     * stream emits when the tab is closed by any means except for the destruction of the parent component
     */
    tabClosed$: Observable<void>;
}


/**
 * Methods of parent tab view, that tabs can access.
 *
 * See {@link TabView} for more information.
 */
export interface TabViewInterface {
    /**
     * See [TabView.currentlySelectedTab]{@link TabView#currentlySelectedTab}
     */
    currentlySelectedTab(): number;

    /**
     * See [TabView.openTab]{@link TabView#openTab}
     */
    openTab(tabContent: TabContent, autoswitch?: boolean, openExising?: boolean): string;

    /**
     * See [TabView.switchToTabIndex]{@link TabView#switchToTabIndex}
     */
    switchToTabIndex(index: number): void;

    /**
     * See [TabView.uniqueId]{@link TabView#uniqueId}
     */
    switchToTabUniqueId(uniqueId: string): void;

    /**
     * See [TabView.closeTabIndex]{@link TabView#closeTabIndex}
     */
    closeTabIndex(index: number, force?: boolean): void;

    /**
     * See [TabView.closeTabUniqueId]{@link TabView#closeTabUniqueId}
     */
    closeTabUniqueId(uniqueId: string, force?: boolean): void;
}
