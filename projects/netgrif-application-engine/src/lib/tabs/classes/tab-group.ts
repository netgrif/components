import {TabContent, TabGroupInterface} from '../interfaces';
import {OpenedTab} from './opened-tab';
import {Injector, StaticProvider} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {FormControl} from '@angular/forms';
import {orderBy} from 'natural-orderby';
import {NAE_TAB_DATA} from '../tab-data-injection-token/tab-data-injection-token.module';

export class TabGroup implements TabGroupInterface{

    openedTabs: Array<OpenedTab>;
    selectedIndex = new FormControl(0);

    private nextId = 0;
    private tabGroupInterface: TabGroupInterface = {
        openTab: (tabContent: TabContent, autoswitch: boolean = false) => this.openTab(tabContent, autoswitch),
        switchToTabIndex: (index: number) => this.switchToTabIndex(index),
        switchToTabUniqueId: (uniqueId: string) => this.switchToTabUniqueId(uniqueId),
        closeTabIndex: (index: number) => this.closeTabIndex(index),
        closeTabUniqueId: (uniqueId: string) => this.closeTabUniqueId(uniqueId)
    };

    constructor(private initialTabs: Array<TabContent>) {
        this.initialTabs.forEach(tab => {
            if (tab.order === undefined) {
                tab.order = 0;
            }
        });

        // orderBy is a stable sort. Native javascript implementation has undefined stability and it depends on it's implementation (browser)
        this.openedTabs = orderBy(this.initialTabs, v => v.order, 'asc').map(tabData => new OpenedTab(tabData, `${this.getNextId()}`));
    }

    public openTab(tabContent: TabContent, autoswitch: boolean = false): string {
        const newTab = new OpenedTab(tabContent, `${this.getNextId()}`);
        let index = this.openedTabs.findIndex(existingTab => existingTab.order > newTab.order);
        if (index === -1) {
            index = this.openedTabs.length;
        }
        this.openedTabs.splice(index,0, newTab);

        if (autoswitch) {
            this.selectedIndex.setValue(index);
        }
        return `${this.nextId - 1}`;
    }

    public switchToTabIndex(index: number): void {
        this.checkIndexRange(index);
        this.selectedIndex.setValue(index);
    }

    public switchToTabUniqueId(uniqueId: string): void {
        const index = this.getTabIndex(uniqueId);
        this.selectedIndex.setValue(index);
    }

    public closeTabIndex(index: number): void {
        this.checkIndexRange(index);
        if ( !this.openedTabs[index].canBeDeleted) {
            throw new Error(`Tab at index ${index} can't be closed`);
        }
        this.openedTabs.splice(index, 1);
    }

    public closeTabUniqueId(uniqueId: string): void {
        const index = this.getTabIndex(uniqueId);
        if ( !this.openedTabs[index].canBeDeleted) {
            throw new Error(`Tab with ID ${uniqueId} can't be closed`);
        }
        this.openedTabs.splice(index, 1);
    }

    public initializeTab(index: number): void {
        const tab = this.openedTabs[index];
        if( !tab.isTabInitialized) {
            Object.assign(tab.injectedObject, {
                tabUniqueId: tab.uniqueId,
                tabGroupRef: this.tabGroupInterface
            });

            const providers: StaticProvider[] = [
                {provide: NAE_TAB_DATA, useValue: tab.injectedObject}
            ];
            const injector = Injector.create({providers});

            tab.portal = new ComponentPortal(tab.tabContentComponent, null, injector);
            tab.isTabInitialized = true;
        }
    }

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

    private checkIndexRange(index: number) {
        if (index < 0 || index >= this.openedTabs.length) {
            throw new Error(`No tab with index ${index} exists`);
        }
    }
}
