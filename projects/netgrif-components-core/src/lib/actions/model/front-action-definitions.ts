import {FrontActionDefinition} from "./front-action-definition";
import {Injector} from "@angular/core";
import {Router} from "@angular/router";
import {FrontAction} from "../../data-fields/models/changed-fields";
import {TaskContentService} from "../../task-content/services/task-content.service";

export const alertFunction: FrontActionDefinition = {
    fn: (injector: Injector, frontAction: FrontAction) => {
        alert(frontAction.args[0])
    }
}

export const clickFunction: FrontActionDefinition = {
    fn: (injector: Injector, frontAction: FrontAction) => {
        const router = injector.get(Router);
        router.navigate([frontAction.args[0]])
    }
}

export const validateTask: FrontActionDefinition = {
    fn: (injector: Injector, frontAction: FrontAction) => {
        const taskContentService = injector.get(TaskContentService);
        taskContentService.validateTaskData(frontAction.args[0] as string);
    }
}
