import {Component, Injector, Input, OnInit, StaticProvider} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import { orderBy } from 'natural-orderby';
import {TabContent} from '../interfaces';
import {NAE_TAB_DATA} from '../tabs.module';
import {FormControl} from '@angular/forms';
import {OpenedTab} from '../classes/opened-tab';

@Component({
    selector: 'nae-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {

    initializeTabLambda = (index: number) => {this.initializeTab(index)};

    @Input() initialTabs: Array<TabContent>;
    openedTabs: Array<OpenedTab> = [];
    selectedIndex = new FormControl(0);

    private lastId = 0;

    constructor() { }

    ngOnInit(): void {
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
        if( !this.openedTabs[index].isTabInitialized) {
            const providers: StaticProvider[] = [
                {provide: NAE_TAB_DATA, useValue: this.openedTabs[index].injectedObject}
            ];
            const injector = Injector.create({providers});

            this.openedTabs[index].portal = new ComponentPortal(this.openedTabs[index].tabContentComponent, null, injector);
            this.openedTabs[index].isTabInitialized = true;
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
