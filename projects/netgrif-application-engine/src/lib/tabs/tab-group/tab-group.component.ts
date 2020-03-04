import {Component, Input, OnInit, Type} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';

export interface TabContent {
    label: {
        icon?: string,
        text?: string,
        canBeDeleted: boolean
    },
    tabContentComponent: Type<any>,
    injectedObject?: object
}

interface OpenedTab extends TabContent{
    portal?: ComponentPortal<any>
}

@Component({
    selector: 'nae-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {

    @Input() initialTabs: Array<TabContent>;

    private openedTabs: Array<OpenedTab>;

    constructor() { }

    ngOnInit(): void {
        this.openedTabs = [].concat(this.initialTabs);
    }

    public openTab(tabContent: TabContent, autoswitch: boolean = false): void {

    }

    public switchToTab(index: number): void {

    }

    public closeTab(index: number): void {

    }
}
