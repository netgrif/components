import {Type} from '@angular/core';

export interface TabContent {
    label?: {
        icon?: string,
        text?: string
    };
    canBeDeleted: boolean;
    tabContentComponent: Type<any>;
    injectedObject?: object;
    order?: number;
}

export interface InjectedTabData {
    tabUniqueId: number;
    tabGroupRef: TabGroupInterface;
}

export interface TabGroupInterface {
    openTab(tabContent: TabContent, autoswitch?: boolean): string;
    switchToTabIndex(index: number): void;
    switchToTabUniqueId(uniqueId: string): void;
    closeTabIndex(index: number): void;
    closeTabUniqueId(uniqueId: string): void;
}
