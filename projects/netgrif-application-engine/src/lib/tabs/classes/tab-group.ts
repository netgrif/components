import {TabContent} from '../interfaces';
import {OpenedTab} from './opened-tab';
import {Injector, StaticProvider} from '@angular/core';
import {NAE_TAB_DATA} from '../tabs.module';
import {ComponentPortal} from '@angular/cdk/portal';
import {FormControl} from '@angular/forms';
import {orderBy} from 'natural-orderby';

export class TabGroup {

    openedTabs: Array<OpenedTab>;
    selectedIndex = new FormControl(0);

    private lastId = 0;

    constructor(private initialTabs: Array<TabContent>) {
        this.initialTabs.forEach(tab => {
            if (tab.order === undefined) {
                tab.order = 0;
            }
        });

        // orderBy is a stable sort. Native javascript implementation has undefined stability and it depends on it's implementation (browser)
        this.openedTabs = orderBy(this.initialTabs, v => v.order, 'asc').map(tabData => new OpenedTab(tabData, this.getNextId()));
    }

    public openTab(tabContent: TabContent, autoswitch: boolean = false): void {
        const newTab = new OpenedTab(tabContent, this.getNextId());
        let index = this.openedTabs.findIndex(existingTab => existingTab.order > newTab.order);
        if (index === -1) {
            index = this.openedTabs.length;
        }
        this.openedTabs.splice(index,0, newTab);

        if (autoswitch) {
            this.selectedIndex.setValue(index);
        }
    }

    public switchToTab(uniqueId: number): void {
        const index = this.getTabIndex(uniqueId);
        this.selectedIndex.setValue(index);
    }

    public closeTab(uniqueId: number): void {
        const index = this.getTabIndex(uniqueId);
        if ( !this.openedTabs[index].canBeDeleted) {
            throw new Error(`Tab with ID ${uniqueId} can't be deleted`);
        }
        this.openedTabs.splice(index, 1);
    }

    public initializeTab(index: number): void {
        const tab = this.openedTabs[index];
        if( !tab.isTabInitialized) {
            Object.assign(tab.injectedObject, {
                tabUniqueId: tab.uniqueId,
                tabGroupRef: this
            });

            const providers: StaticProvider[] = [
                {provide: NAE_TAB_DATA, useValue: tab.injectedObject}
            ];
            const injector = Injector.create({providers});

            tab.portal = new ComponentPortal(tab.tabContentComponent, null, injector);
            tab.isTabInitialized = true;
        }
    }

    private getTabIndex(uniqueId: number): number {
        const index = this.openedTabs.findIndex(tab => tab.uniqueId === uniqueId);
        if (index === -1) {
            throw new Error(`No tab with ID ${uniqueId} exists`);
        }
        return index;
    }

    private getNextId(): number {
        return this.lastId++;
    }
}
