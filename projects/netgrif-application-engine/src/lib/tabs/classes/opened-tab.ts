import {TabContent} from '../interfaces';
import {ComponentPortal} from '@angular/cdk/portal';
import {Type} from '@angular/core';

export class OpenedTab implements TabContent {

    label: {
        icon?: string;
        text?: string;
    };
    canBeClosed: boolean;
    tabContentComponent: Type<any>;
    injectedObject: object = {};
    order = 0;
    portal: ComponentPortal<any>;
    isTabInitialized = false;

    constructor(tabContent: TabContent, public uniqueId: string) {
        Object.assign(this, tabContent);
    }
}
