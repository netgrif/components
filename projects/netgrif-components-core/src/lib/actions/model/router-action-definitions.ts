import {FrontActionDefinition} from "./front-action-definition";
import {Injector} from "@angular/core";
import {FrontAction} from "../../data-fields/models/changed-fields";
import {Router} from "@angular/router";

export const redirectAction: FrontActionDefinition = {
    call: (injector: Injector, frontAction: FrontAction) => {
        const router = injector.get(Router);
        router.navigate([frontAction.args[0]])
    }
}
