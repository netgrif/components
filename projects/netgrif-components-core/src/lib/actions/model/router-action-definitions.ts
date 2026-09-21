import {FrontActionDefinition} from "./front-action-definition";
import {Injector} from "@angular/core";
import {FrontAction} from "../../data-fields/models/changed-fields";
import {Router} from "@angular/router";
import {SnackBarService} from "../../snack-bar/services/snack-bar.service";
import {SnackBarHorizontalPosition, SnackBarVerticalPosition} from "../../snack-bar/models/snack-bar-enums";

export const redirectAction: FrontActionDefinition = {
    call: (injector: Injector, frontAction: FrontAction) => {
        const router = injector.get(Router);
        router.navigate([frontAction.args[0]])
    }
}


export const snackBarAction: FrontActionDefinition = {
    call: (injector: Injector, frontAction: FrontAction) => {
        const snackBarService = injector.get(SnackBarService);
        snackBarService.openGenericSnackBar(frontAction.args[0], 'info', SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.CENTER, 2500)
    }
}
