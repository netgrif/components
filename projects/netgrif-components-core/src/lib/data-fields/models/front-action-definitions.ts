import {FrontActionDefinition} from "./front-action-definition";
import {Injector} from "@angular/core";
import {Router} from "@angular/router";
import {FrontAction} from "./changed-fields";

export const clickFunction: FrontActionDefinition = {
    fn: (injector: Injector, frontAction: FrontAction) => {
        const router = injector.get(Router);
        router.navigate([frontAction.args['url']])
    }
}
