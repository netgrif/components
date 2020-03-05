import {Component, Injector, Input, OnInit, StaticProvider} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import { orderBy } from 'natural-orderby';
import {TabContent} from '../interfaces';
import {NAE_TAB_DATA} from '../tabs.module';

interface OpenedTab extends TabContent{
    portal?: ComponentPortal<any>,
    injector?: Injector
    tabInitialized?: boolean
}

@Component({
    selector: 'nae-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {

    @Input() initialTabs: Array<TabContent>;

    openedTabs: Array<OpenedTab> = [];

    initializeTabLambda = (index: number) => {this.initializeTab(index)};

    constructor() { }

    ngOnInit(): void {
        console.log(this.initialTabs);
        this.initialTabs.forEach(tab => {
            if (tab.order === undefined) {
                tab.order = 0;
            }
        });

        // orderBy is a stable sort. Native javascript implementation has undefined stability and it depends on it's implementation (browser)
        this.openedTabs = orderBy(this.initialTabs, v => v.order, 'asc');

        this.openedTabs.forEach(tab => {
            tab.tabInitialized = false
        });
        console.log(this.openedTabs);
    }

    public openTab(tabContent: TabContent, autoswitch: boolean = false): void {

    }

    public switchToTab(index: number): void {

    }

    public closeTab(index: number): void {

    }

    public initializeTab(index: number): void {
        const providers: StaticProvider[] = [
            {provide: NAE_TAB_DATA, useValue: this.openedTabs[index].injectedObject}
        ];
        const injector = Injector.create({providers});

        this.openedTabs[index].portal = new ComponentPortal(this.openedTabs[index].tabContentComponent, null, injector);
        this.openedTabs[index].tabInitialized = true;
    }
}
