import {Type} from '@angular/core';
import {TabGroup} from './classes/tab-group';

export interface TabContent {
    label?: {
        icon?: string,
        text?: string
    },
    canBeDeleted: boolean,
    tabContentComponent: Type<any>,
    injectedObject?: object,
    order?: number
}

export interface InjectedTabData {
    tabUniqueId: number,
    tabGroupRef: TabGroup
}
