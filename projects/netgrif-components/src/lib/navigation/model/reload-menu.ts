import {Injector} from "@angular/core";
import {
    FrontActionDefinition,
    FrontAction, DoubleDrawerNavigationService,
} from '@netgrif/components-core';

export const reloadMenu: FrontActionDefinition = {
    call: (injector: Injector, frontAction: FrontAction) => {
        const doubleDrawerNavigationService = injector.get(DoubleDrawerNavigationService);
        doubleDrawerNavigationService.loadNavigationItems(doubleDrawerNavigationService.currentNode);
    }
}
