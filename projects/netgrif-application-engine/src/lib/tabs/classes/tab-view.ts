import {TabContent, TabViewInterface} from '../interfaces';
import {OpenedTab} from './opened-tab';
import {Injector, StaticProvider} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {FormControl} from '@angular/forms';
import {orderBy} from 'natural-orderby';
import {NAE_TAB_DATA} from '../tab-data-injection-token/tab-data-injection-token.module';
import {ViewService} from '../../routing/view-service/view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {FixedIdViewService} from '../../routing/view-service/fixed-id-view.service';

/**
 * Holds the logic for tab management in {@link TabViewComponent}.
 * If you want to implement your own TabViewComponent, you might want to extend this class to hold your logic.
 */
export class TabView implements TabViewInterface {

    /**
     * Holds the tabs that are opened in the tab view, and allows them to be bound to HTML.
     */
    public openedTabs: Array<OpenedTab>;
    /**
     * Holds the index of the currently selected tab in a {@link FormControl} object.
     *
     * Selected index initializes to `0`.
     */
    public selectedIndex = new FormControl(0);

    /**
     * @ignore
     * Is incremented to generate new unique IDs for tabs.
     */
    private nextId = 0;
    /**
     * @ignore
     * Holds a reference to an object that hides some public attributes and methods from tabs.
     */
    private tabViewInterface: TabViewInterface = {
        currentlySelectedTab: () => this.currentlySelectedTab(),
        openTab: (tabContent: TabContent, autoswitch: boolean = false) => this.openTab(tabContent, autoswitch),
        switchToTabIndex: (index: number) => this.switchToTabIndex(index),
        switchToTabUniqueId: (uniqueId: string) => this.switchToTabUniqueId(uniqueId),
        closeTabIndex: (index: number, force: boolean = false) => this.closeTabIndex(index, force),
        closeTabUniqueId: (uniqueId: string, force: boolean = false) => this.closeTabUniqueId(uniqueId, force)
    };
    /**
     * Holds the index of the tab that is selected right now, so that when the currently
     * selected index changes this information can be used to deduce the previously selected index.
     */
    protected _lastSelectedTabIndex = 0;

    /**
     * @param _viewService [ViewService]{@link ViewService} reference
     * @param _logger [Logger]{@link LoggerService} reference
     * @param initialTabs - Tabs that should be initially opened in the tab view
     */
    constructor(private _viewService: ViewService, private _logger: LoggerService, private initialTabs: Array<TabContent>) {
        this.initialTabs.forEach(tab => {
            if (tab.order === undefined) {
                tab.order = 0;
            }
            tab.initial = true;
        });

        // orderBy is a stable sort
        // Native javascript implementation has undefined stability and it depends on it's implementation (browser)
        this.openedTabs = orderBy(this.initialTabs, v => v.order, 'asc').map(tabData => new OpenedTab(tabData, `${this.getNextId()}`));

        this.selectedIndex.valueChanges.subscribe(newSelectedIndex => {
            if (newSelectedIndex !== this._lastSelectedTabIndex) {
                this.openedTabs[this._lastSelectedTabIndex].tabSelected$.next(false);
                this.openedTabs[newSelectedIndex].tabSelected$.next(true);
                this._lastSelectedTabIndex = newSelectedIndex;
            }
        });
    }

    /**
     * @returns the index of the currently selected tab
     */
    public currentlySelectedTab(): number {
        return this.selectedIndex.value;
    }

    /**
     * Opens a new tab with the provided content.
     * @param tabContent - content of the new tab
     * @param autoswitch - whether the newly opened tab should be switched to. Defaults to `false`.
     * @returns the `tabUniqueId` of the newly opened tab
     */
    public openTab(tabContent: TabContent, autoswitch: boolean = false): string {
        if (tabContent.initial) {
            this._logger.warn(`'initial' attribute is not meant to be used with new tabs and will be ignored`);
            delete tabContent.initial;
        }

        const newTab = new OpenedTab(tabContent, `${this.getNextId()}`);
        let index = this.openedTabs.findIndex(existingTab => existingTab.order > newTab.order);
        if (index === -1) {
            index = this.openedTabs.length;
        }
        this.openedTabs.splice(index, 0, newTab);

        if (autoswitch) {
            this.selectedIndex.setValue(index);
        }
        return `${this.nextId - 1}`;
    }

    /**
     * Switches to a tab with the given `index`.
     *
     * Throws an error if the `index` is invalid.
     * @param index - index of the tab that should be switched to
     */
    public switchToTabIndex(index: number): void {
        this.checkIndexRange(index);
        this.selectedIndex.setValue(index);
    }

    /**
     * Switches to a tab with the given `uniqueId`.
     *
     * Throws an error if the `uniqueId` is invalid.
     * @param uniqueId - id of the tab that should be switched to
     */
    public switchToTabUniqueId(uniqueId: string): void {
        const index = this.getTabIndex(uniqueId);
        this.selectedIndex.setValue(index);
    }

    /**
     * Closes the tab with the given `index`.
     *
     * Throws an error if the `index` is invalid.
     *
     * Throws an error if the tab has it's `canBeClosed` property set to `false`.
     * @param index index of the tab that should be closed
     * @param force when `true` closes a tab even if it's `cantBeClosed` attribute is set to `true`
     */
    public closeTabIndex(index: number, force: boolean = false): void {
        this.closeTab(index, force, `Tab at index ${index} can't be closed`);
    }

    /**
     * Closes the tab with the given `uniqueId`. Throws an error if the `uniqueId` is invalid.
     * Throws an error if the tab has it's `canBeClosed` property set to `false`.
     * @param uniqueId - id of the tab that should be closed
     * @param force when `true` closes a tab even if it's `cantBeClosed` attribute is set to `true`
     */
    public closeTabUniqueId(uniqueId: string, force: boolean = false): void {
        const index = this.getTabIndex(uniqueId);
        this.closeTab(index, force, `Tab with ID ${uniqueId} can't be closed`);
    }

    /**
     * Closes the tab at the given index.
     *
     * If the conditions for closing a tab are not met throws an `Error` with the given message.
     * @param index index of the tab that should be closed
     * @param force when `true` closes a tab even if it's `cantBeClosed` attribute is set to `true`
     * @param error the message that should be displayed if the conditions for closing a tab are not met
     */
    protected closeTab(index: number, force: boolean, error: string): void {
        this.checkIndexRange(index);
        if (!force && !this.openedTabs[index].canBeClosed) {
            throw new Error(error);
        }
        if (index === this.selectedIndex.value && this.openedTabs[index].parentUniqueId) {
            this.switchToTabUniqueId(this.openedTabs[index].parentUniqueId);
        }
        const deleted = this.openedTabs.splice(index, 1);
        deleted[0].destroy();
    }

    /**
     * Initializes the tab if it wasn't initialized yet.
     * Creates a new {@link ComponentPortal} for the tab and provides the data for the tab under the `NAE_TAB_DATA` injection token.
     * @param index - index of the tab that should be initialized
     */
    public initializeTab(index: number): void {
        this.checkIndexRange(index);
        const tab = this.openedTabs[index];
        if (!tab.isTabInitialized) {
            Object.assign(tab.injectedObject, {
                tabUniqueId: tab.uniqueId,
                tabViewRef: this.tabViewInterface,
                tabSelected$: tab.tabSelected$.asObservable()
            });

            const providers: StaticProvider[] = [
                {provide: NAE_TAB_DATA, useValue: tab.injectedObject}
            ];
            if (tab.initial) {
                tab.tabViewService = new FixedIdViewService(
                    `${this._viewService.getViewId()}${this._viewService.ID_DELIMITER}${tab.uniqueId}`,
                    this._viewService);
                providers.push({provide: ViewService, useValue: tab.tabViewService});
            }

            const injector = Injector.create({providers});

            tab.portal = new ComponentPortal(tab.tabContentComponent, null, injector);
            tab.isTabInitialized = true;
        }
    }

    /**
     * Transforms a tab `uniqueId` into it's index.
     *
     * Throws an error if no tab with the given `uniqueId` exists.
     * @param uniqueId - id of the tab that we want to find index for
     * @returns index of the tab with the given id
     */
    private getTabIndex(uniqueId: string): number {
        const index = this.openedTabs.findIndex(tab => tab.uniqueId === uniqueId);
        if (index === -1) {
            throw new Error(`No tab with ID ${uniqueId} exists`);
        }
        return index;
    }

    private getNextId(): number {
        return this.nextId++;
    }

    private checkIndexRange(index: number): void {
        if (index < 0 || index >= this.openedTabs.length) {
            throw new Error(`No tab with index ${index} exists`);
        }
    }
}
