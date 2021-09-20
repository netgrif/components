import {InjectedTabData, TabContent, TabViewInterface} from '../interfaces';
import {OpenedTab} from './opened-tab';
import {Injector, StaticProvider} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {orderBy} from 'natural-orderby';
import {NAE_TAB_DATA} from '../tab-data-injection-token/tab-data-injection-token';
import {ViewService} from '../../routing/view-service/view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {InjectedTabbedTaskViewData} from '../../view/task-view/models/injected-tabbed-task-view-data';
import {TaskSearchCaseQuery, TaskSearchRequestBody} from '../../filter/models/task-search-request-body';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {IncrementingCounter} from '../../utility/incrementing-counter';
import {NAE_VIEW_ID_SEGMENT} from '../../user/models/view-id-injection-tokens';

/**
 * Holds the logic for tab management in {@link AbstractTabViewComponent}.
 * If you want to implement your own TabViewComponent, you might want to extend this class to hold your logic.
 */
export class TabView implements TabViewInterface {

    public static readonly DYNAMIC_TAB_VIEW_ID_SEGMENT = 'dynamic';

    /**
     * Holds the tabs that are opened in the tab view, and allows them to be bound to HTML.
     */
    public openedTabs: Array<OpenedTab>;
    /**
     * Holds the index of the currently selected tab.
     *
     * Selected index initializes to `0`.
     */
    public selectedIndex = 0;

    private uniqueIdCounter = new IncrementingCounter();
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
     * @param _viewService [ViewService]{@link ViewService} reference
     * @param _logger [Logger]{@link LoggerService} reference
     * @param _initialTabs Tabs that should be initially opened in the tab view
     * @param _parentInjector `Injector` instance of the [TabViewComponent]{@link AbstractTabViewComponent},
     * to be passed onto each tab, so that the dependency injection tree is not broken
     */
    constructor(private _viewService: ViewService,
                private _logger: LoggerService,
                private _initialTabs: Array<TabContent>,
                private _parentInjector: Injector) {
        this._initialTabs.forEach(tab => {
            if (tab.order === undefined) {
                tab.order = 0;
            }
            tab.initial = true;
        });

        // orderBy is a stable sort
        // Native javascript implementation has undefined stability and it depends on it's implementation (browser)
        this.openedTabs = orderBy(this._initialTabs, v => v.order, 'asc').map(tabData =>
            new OpenedTab(tabData, `${this.uniqueIdCounter.next()}`));
        if (this.openedTabs.length > 0) {
            this.openedTabs[0].tabSelected$.next(true);
        }
    }

    /**
     * @returns the index of the currently selected tab
     */
    public currentlySelectedTab(): number {
        return this.selectedIndex;
    }

    /**
     * Opens a new tab with the provided content.
     * @param tabContent - content of the new tab
     * @param autoswitch - whether the newly opened tab should be switched to. Defaults to `false`.
     * @param openExisting - whether the opened tab already existing should be switched to existing one. Defaults to `true`.
     * @returns the `tabUniqueId` of the newly opened tab
     */
    public openTab(tabContent: TabContent, autoswitch: boolean = false, openExisting: boolean = true): string {
        if (tabContent.initial) {
            this._logger.warn(`'initial' attribute is not meant to be used with new tabs and will be ignored`);
            delete tabContent.initial;
        }

        const newTab = new OpenedTab(tabContent, `${this.uniqueIdCounter.next()}`);
        const indexExisting = this.findIndexExistingTab(newTab);
        if (indexExisting === -1 || !openExisting) {
            return this.openNewTab(newTab, autoswitch);
        } else {
            this.openedTabs[this.selectedIndex].tabSelected$.next(false);
            this.selectedIndex = indexExisting;
            this.openedTabs[this.selectedIndex].tabSelected$.next(true);
            return this.openedTabs[indexExisting].uniqueId;
        }
    }

    protected findIndexExistingTab(newTab: OpenedTab) {
        if (!this.searchesForOneCaseId(newTab)) {
            return -1;
        }
        return this.openedTabs.findIndex(existingTab =>
            this.searchesForOneCaseId(existingTab) && this.getSearchedCaseId(existingTab) === this.getSearchedCaseId(newTab));
    }

    private searchesForOneCaseId(tab: OpenedTab): boolean {
        return this.hasCaseFilterParamSet(tab)
            && !Array.isArray(this.getSearchedCase(tab))
            && !!this.getSearchedCaseId(tab);
    }

    private getSearchedCaseId(tab: OpenedTab): string {
        return (this.getSearchedCase(tab) as TaskSearchCaseQuery).id;
    }

    private getSearchedCase(tab: OpenedTab): TaskSearchCaseQuery | Array<TaskSearchCaseQuery> {
        return ((tab.injectedObject as InjectedTabbedTaskViewData).baseFilter.getRequestBody() as TaskSearchRequestBody).case;
    }

    private hasCaseFilterParamSet(tab: OpenedTab): boolean {
        return this.hasBaseFilter(tab)
            && !!(((tab.injectedObject as InjectedTabbedTaskViewData).baseFilter.getRequestBody() as TaskSearchRequestBody).case);
    }

    private hasBaseFilter(tab: OpenedTab): boolean {
        return this.hasInjectedObject(tab) && !!((tab.injectedObject as InjectedTabbedTaskViewData).baseFilter);
    }

    private hasInjectedObject(tab: OpenedTab): boolean {
        return !!tab.injectedObject;
    }

    /**
     * Adds a new tab into the correct position based on its `order` property.
     * @param newTab the tab that should be opened
     * @param autoswitch whether the new tab should be switched to after it is created
     * @returns the `uniqueId` of the opened tab
     */
    protected openNewTab(newTab: OpenedTab, autoswitch: boolean): string {
        let index = this.openedTabs.findIndex(existingTab => existingTab.order > newTab.order);
        if (index === -1) {
            index = this.openedTabs.length;
        }
        this.openedTabs.splice(index, 0, newTab);

        if (autoswitch || this.openedTabs.length === 1) {
            this.openedTabs[this.selectedIndex].tabSelected$.next(false);
            this.selectedIndex = index;
            this.openedTabs[this.selectedIndex].tabSelected$.next(true);
        }
        return newTab.uniqueId;
    }

    /**
     * Switches to a tab with the given `index`.
     *
     * Throws an error if the `index` is invalid.
     * @param index - index of the tab that should be switched to
     */
    public switchToTabIndex(index: number): void {
        this.checkIndexRange(index);
        this.openedTabs[this.selectedIndex].tabSelected$.next(false);
        this.selectedIndex = index;
        this.openedTabs[this.selectedIndex].tabSelected$.next(true);
    }

    /**
     * Switches to a tab with the given `uniqueId`.
     *
     * Throws an error if the `uniqueId` is invalid.
     * @param uniqueId - id of the tab that should be switched to
     */
    public switchToTabUniqueId(uniqueId: string): void {
        this.openedTabs[this.selectedIndex].tabSelected$.next(false);
        this.selectedIndex = this.getTabIndex(uniqueId);
        this.openedTabs[this.selectedIndex].tabSelected$.next(true);
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
        if (index === this.selectedIndex && this.openedTabs[index].parentUniqueId !== undefined) {
            this.switchToTabUniqueId(this.openedTabs[index].parentUniqueId);
        }
        if (index === this.selectedIndex && this.selectedIndex + 1 < this.openedTabs.length) {
            this.openedTabs[index + 1].tabSelected$.next(true);
        }
        this.openedTabs[index].tabClosed$.next();
        const deleted = this.openedTabs.splice(index, 1);
        deleted[0].destroy();
        if (index < this.selectedIndex) {
            this.selectedIndex = this.selectedIndex - 1;
        }
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
                tabSelected$: tab.tabSelected$.asObservable(),
                tabClosed$: tab.tabClosed$.asObservable(),
            } as InjectedTabData);

            const providers: Array<StaticProvider> = [
                {provide: NAE_TAB_DATA, useValue: tab.injectedObject}
            ];
            providers.push({provide: NAE_VIEW_ID_SEGMENT, useValue: tab.initial ? tab.uniqueId : TabView.DYNAMIC_TAB_VIEW_ID_SEGMENT});

            const injector = Injector.create({providers, parent: this._parentInjector});

            tab.portal = new ComponentPortal(tab.tabContentComponent, null, injector);
            tab.isTabInitialized = true;
        }
    }

    public tabChange(event: MatTabChangeEvent) {
        if (event.index !== this.selectedIndex) {
            let tab = this.openedTabs[this.selectedIndex];
            if (tab) {
                tab.tabSelected$.next(false);
            }
            tab = this.openedTabs[event.index];
            if (tab) {
                tab.tabSelected$.next(true);
            }
            this.selectedIndex = event.index;
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

    private checkIndexRange(index: number): void {
        if (index < 0 || index >= this.openedTabs.length) {
            throw new Error(`No tab with index ${index} exists`);
        }
    }
}
