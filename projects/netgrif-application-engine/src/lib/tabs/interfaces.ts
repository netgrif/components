import {Type} from '@angular/core';

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
