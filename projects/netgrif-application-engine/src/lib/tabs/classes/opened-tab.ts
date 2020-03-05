import {TabContent} from '../interfaces';
import {ComponentPortal} from '@angular/cdk/portal';
import {Type} from '@angular/core';

export class OpenedTab implements TabContent {

    label: {
        icon?: string;
        text?: string;
    };
    canBeDeleted: boolean;
    order: number;
    tabContentComponent: Type<any>;
    injectedObject: object;
    portal: ComponentPortal<any>;
    isTabInitialized: boolean = false;

    constructor(tabContent: TabContent, public uniqueId: string) {
        Object.assign(this, tabContent);
    }
}
