import {FrontActionDefinition} from "./front-action-definition";
import {Injector} from "@angular/core";
import {FrontAction} from "../../data-fields/models/changed-fields";
import {TaskContentService} from "../../task-content/services/task-content.service";
import {TaskDataService} from "../../task/services/task-data.service";
import {AfterAction} from "../../utility/call-chain/after-action";

export const validateTaskAction: FrontActionDefinition = {
    call: (injector: Injector, frontAction: FrontAction) => {
        const taskContentService = injector.get(TaskContentService);
        taskContentService.validateTaskData(frontAction.args[0] as string);
    }
}

export const reloadTaskAction: FrontActionDefinition = {
    call: (injector: Injector, frontAction: FrontAction) => {
        const taskDataService = injector.get(TaskDataService);
        taskDataService.initializeTaskDataFields(new AfterAction(), true);
    }
}
