import {Injector} from "@angular/core";
import {
    FrontActionDefinition,
    FrontAction,
} from '@netgrif/components-core';
import {BuilderModeService} from "./services/builder-mode.service";

export const readOnlyBuilder: FrontActionDefinition = {
    call: (injector: Injector, frontAction: FrontAction) => {
        const builderModeService = injector.get(BuilderModeService);
        if (!!builderModeService) {
            builderModeService.readOnly$.next(true);
        }
    }
}
