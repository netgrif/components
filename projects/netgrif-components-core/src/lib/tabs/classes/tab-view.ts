import {
    InjectedTabData,
    PersistedTabState,
    PersistedTabViewState,
    TabContent,
    TabPersistenceAdapter,
    TabViewInterface
} from '../interfaces';
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
import {FormControl} from '@angular/forms';
import {TabPersistenceService} from '../services/tab-persistence.service';

export interface TabViewPersistenceOptions {
    key: string;
    service: TabPersistenceService;
    adapter?: TabPersistenceAdapter;
}

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
    public selectedIndex: FormControl<number>;

    private uniqueIdCounter = new IncrementingCounter();

    private _switching = false;

    private _pendingTabUniqueId: string | undefined;

    private readonly _persistence?: TabViewPersistenceOptions;

    /**
     * @ignore
     * Holds a reference to an object that hides some public attributes and methods from tabs.
     */
    private tabViewInterface: TabViewInterface = {
        currentlySelectedTab: () => this.currentlySelectedTab(),
        openTab: (tabContent: TabContent, autoswitch = false) => this.openTab(tabContent, autoswitch),
        switchToTabIndex: (index: number) => this.switchToTabIndex(index),
        switchToTabUniqueId: (uniqueId: string) => this.switchToTabUniqueId(uniqueId),
        closeTabIndex: (index: number, force = false) => this.closeTabIndex(index, force),
        closeTabUniqueId: (uniqueId: string, force = false) => this.closeTabUniqueId(uniqueId, force),
        pinTabIndex: (index: number) => this.pinTabIndex(index),
        unpinTabIndex: (index: number) => this.unpinTabIndex(index),
        toggleTabPinIndex: (index: number) => this.toggleTabPinIndex(index),
        pinTabUniqueId: (uniqueId: string) => this.pinTabUniqueId(uniqueId),
        unpinTabUniqueId: (uniqueId: string) => this.unpinTabUniqueId(uniqueId),
        toggleTabPinUniqueId: (uniqueId: string) => this.toggleTabPinUniqueId(uniqueId)
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
                private _parentInjector: Injector,
                persistence?: TabViewPersistenceOptions,
                private readonly _pinningEnabled = false) {
        this._persistence = persistence?.key ? persistence : undefined;
        this._initialTabs.forEach((tab, index) => {
            if (tab.order === undefined) {
                tab.order = 0;
            }
            tab.initial = true;
            if (!tab.persistence) {
                tab.persistence = {
                    id: `initial:${index}`,
                    type: 'initial'
                };
            }
        });
        this.selectedIndex = new FormControl(0);

        const persistedState = this._persistence?.service.load(this._persistence.key);
        const restoredTabs = this.restoreTabs(persistedState);
        this.openedTabs = orderBy([...this._initialTabs, ...restoredTabs], v => v.order, 'asc').map(tabData =>
            this.createOpenedTab(tabData));
        this.restoreParentIds();
        const persistedIndex = this.openedTabs.findIndex(tab => tab.persistence?.id === persistedState?.selectedTabId);
        const selectedIndex = persistedIndex === -1 ? 0 : persistedIndex;
        this.selectedIndex.setValue(selectedIndex);
        if (this.openedTabs[selectedIndex]) {
            this.openedTabs[selectedIndex].tabSelected$.next(true);
        }
        this.persist();
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
     * @param openExisting - whether the opened tab already existing should be switched to existing one. Defaults to `true`.
     * @returns the `tabUniqueId` of the newly opened tab
     */
    public openTab(tabContent: TabContent, autoswitch = false, openExisting = true): string {
        if (tabContent.initial) {
            this._logger.warn(`'initial' attribute is not meant to be used with new tabs and will be ignored`);
            delete tabContent.initial;
        }

        const newTab = this.createOpenedTab(tabContent);
        const indexExisting = this.findIndexExistingTab(newTab);
        if (indexExisting === -1 || !openExisting) {
            return this.openNewTab(newTab, autoswitch);
        } else {
            this.setTabIndexWithNotification(indexExisting);
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
            this.setTabIndexWithNotification(index);
        }
        this.persist();
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
        this.setTabIndexWithNotification(index)
    }

    /**
     * Switches to a tab with the given `uniqueId`.
     *
     * Throws an error if the `uniqueId` is invalid.
     * @param uniqueId - id of the tab that should be switched to
     */
    public switchToTabUniqueId(uniqueId: string): void {
        this.setTabIndexWithNotification(this.getTabIndex(uniqueId));
    }

    private setTabIndexWithNotification(index: number): void {
        this.openedTabs[this.selectedIndex.value]?.tabSelected$.next(false);
        this.selectedIndex.setValue(index);
        this.openedTabs[this.selectedIndex.value].tabSelected$.next(true);
        this.persist();
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
    public closeTabIndex(index: number, force = false): void {
        this.closeTab(index, force, `Tab at index ${index} can't be closed`);
    }

    /**
     * Closes the tab with the given `uniqueId`. Throws an error if the `uniqueId` is invalid.
     * Throws an error if the tab has it's `canBeClosed` property set to `false`.
     * @param uniqueId - id of the tab that should be closed
     * @param force when `true` closes a tab even if it's `cantBeClosed` attribute is set to `true`
     */
    public closeTabUniqueId(uniqueId: string, force = false): void {
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
        const wasSelected = index === this.selectedIndex.value;
        if (!force && (!this.openedTabs[index].canBeClosed || this.openedTabs[index].pinned)) {
            throw new Error(error);
        }
        if (index === this.selectedIndex.value && this.openedTabs[index].parentUniqueId &&
            this.openedTabs.findIndex(tab => tab.uniqueId === this.openedTabs[index].parentUniqueId) !== -1) {
            this.switchToTabUniqueId(this.openedTabs[index].parentUniqueId);
        }
        if (index === this.selectedIndex.value && this.selectedIndex.value + 1 < this.openedTabs.length) {
            this.openedTabs[index + 1].tabSelected$.next(true);
        }
        this.openedTabs[index].tabClosed$.next();
        const deleted = this.openedTabs.splice(index, 1);
        deleted[0].destroy();
        if (index < this.selectedIndex.value) {
            this.selectedIndex.setValue(this.selectedIndex.value - 1);
        } else if (this.selectedIndex.value >= this.openedTabs.length) {
            this.selectedIndex.setValue(Math.max(0, this.openedTabs.length - 1));
        }
        if (wasSelected) {
            this.openedTabs[this.selectedIndex.value]?.tabSelected$.next(true);
        }
        this.persist();
    }

    public pinTabIndex(index: number): void {
        this.setPinned(index, true);
    }

    public unpinTabIndex(index: number): void {
        this.setPinned(index, false);
    }

    public toggleTabPinIndex(index: number): void {
        this.checkIndexRange(index);
        this.setPinned(index, !this.openedTabs[index].pinned);
    }

    public pinTabUniqueId(uniqueId: string): void {
        this.pinTabIndex(this.getTabIndex(uniqueId));
    }

    public unpinTabUniqueId(uniqueId: string): void {
        this.unpinTabIndex(this.getTabIndex(uniqueId));
    }

    public toggleTabPinUniqueId(uniqueId: string): void {
        this.toggleTabPinIndex(this.getTabIndex(uniqueId));
    }

    private setPinned(index: number, pinned: boolean): void {
        this.checkIndexRange(index);
        const tab = this.openedTabs[index];
        if (!tab.pinnable) {
            throw new Error(`Tab at index ${index} can't be pinned`);
        }
        tab.pinned = pinned;
        this.persist();
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
                tabViewRef: Object.assign({
                    setIcon: t => {
                        tab.setIcon(t);
                        this.persist();
                    },
                    setText: t => {
                        tab.setText(t);
                        this.persist();
                    },
                    getIcon$: () => tab.getIcon$(),
                    getText$: () => tab.getText$(),
                }, this.tabViewInterface),
                tabSelected$: tab.tabSelected$.asObservable(),
                tabClosed$: tab.tabClosed$.asObservable(),
            } as InjectedTabData);

            const providers: Array<StaticProvider> = [
                {provide: NAE_TAB_DATA, useValue: tab.injectedObject}
            ];
            providers.push({
                provide: NAE_VIEW_ID_SEGMENT,
                useValue: tab.initial ? tab.uniqueId : ((tab.injectedObject as InjectedTabData)?.loadFilter?.id ?? TabView.DYNAMIC_TAB_VIEW_ID_SEGMENT)
            });

            const injector = Injector.create({providers, parent: this._parentInjector});

            tab.portal = new ComponentPortal(tab.tabContentComponent, null, injector);
            tab.isTabInitialized = true;
        }
    }

    public tabChange(event: MatTabChangeEvent) {
        const pendingTabUniqueId = this.openedTabs[event.index]?.uniqueId;
        if (pendingTabUniqueId === undefined) {
            return;
        }
        this._pendingTabUniqueId = pendingTabUniqueId;
        if (this._switching) {
            return; // an update is already being processed; the pending value will be picked up after
        }
        this._processSwitch();
    }

    private _processSwitch() {
        this._switching = true;
        const uniqueId = this._pendingTabUniqueId;
        const index = this.openedTabs.findIndex(tab => tab.uniqueId === uniqueId);

        if (index !== -1 && index !== this.selectedIndex.value) {
            let tab = this.openedTabs[this.selectedIndex.value];
            if (tab) {
                tab.tabSelected$.next(false);
            }
            tab = this.openedTabs[index];
            if (tab) {
                tab.tabSelected$.next(true);
            }
            this.selectedIndex.setValue(index);
            this.persist();
        }

        setTimeout(() => {
            this._switching = false;
            if (this._pendingTabUniqueId !== uniqueId) {
                this._processSwitch();
            }
        }, 150);
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

    public persist(): void {
        if (!this._persistence) {
            return;
        }
        const tabs = this.openedTabs
            .filter(tab => tab.pinned)
            .map(tab => this.persistTab(tab))
            .filter((tab): tab is PersistedTabState => !!tab);
        const selectedTab = this.openedTabs[this.selectedIndex.value];
        const selectedTabId = selectedTab?.persistence?.id
            && (selectedTab.pinned || (selectedTab.initial && this.selectedIndex.value !== 0))
            ? selectedTab.persistence.id
            : undefined;
        this._persistence.service.save(this._persistence.key, {
            version: TabPersistenceService.STATE_VERSION,
            selectedTabId,
            tabs
        });
    }

    private persistTab(tab: OpenedTab): PersistedTabState | undefined {
        if (!tab.persistence) {
            return undefined;
        }
        try {
            JSON.stringify(tab.persistence);
        } catch (error) {
            this._logger.warn(`Tab '${tab.persistence.id}' has non-serializable persistence metadata`, error);
            return undefined;
        }
        const parent = tab.parentUniqueId
            ? this.openedTabs.find(candidate => candidate.uniqueId === tab.parentUniqueId)
            : undefined;
        return {
            persistence: tab.persistence,
            label: {
                icon: tab.getIcon(),
                text: tab.getText()
            },
            order: tab.order,
            pinned: tab.pinned,
            parentPersistenceId: parent?.persistence?.id ?? tab.parentPersistenceId,
            initial: tab.initial
        };
    }

    private restoreTabs(state: PersistedTabViewState | undefined): Array<TabContent> {
        if (!state || !this._pinningEnabled) {
            return [];
        }
        const initialById = new Map(this._initialTabs.map(tab => [tab.persistence?.id, tab]));
        state.tabs.filter(tab => tab.initial).forEach(persisted => {
            const initial = initialById.get(persisted.persistence.id);
            if (initial) {
                initial.pinned = persisted.pinned;
            }
        });
        if (!this._persistence.adapter) {
            return [];
        }
        const restoredTabs = [];
        state.tabs.filter(tab => !tab.initial && tab.pinned).forEach(tab => {
            try {
                const restored = this._persistence.adapter.restore(tab, {
                    initialTabs: this._initialTabs,
                    restoredTabs
                });
                if (restored) {
                    restored.persistence = tab.persistence;
                    restored.pinned = tab.pinned;
                    restored.parentPersistenceId = tab.parentPersistenceId;
                    restored.order = tab.order;
                    restoredTabs.push(restored);
                }
            } catch (error) {
                this._logger.warn(`Tab '${tab.persistence.id}' could not be restored`, error);
            }
        });
        return restoredTabs;
    }

    private createOpenedTab(tab: TabContent): OpenedTab {
        const pinnable = this._pinningEnabled && (tab.pinnable ?? tab.canBeClosed);
        return new OpenedTab({
            ...tab,
            pinnable,
            pinned: pinnable && (tab.pinned ?? false)
        }, `${this.uniqueIdCounter.next()}`);
    }

    private restoreParentIds(): void {
        this.openedTabs.forEach(tab => {
            if (!tab.parentPersistenceId) {
                return;
            }
            tab.parentUniqueId = this.openedTabs.find(parent => parent.persistence?.id === tab.parentPersistenceId)?.uniqueId;
        });
    }
}
