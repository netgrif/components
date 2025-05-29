import {Injector} from "@angular/core";
import {
    FrontActionDefinition,
    FrontAction,
    NAE_TASK_VIEW_COMPONENT,
    TaskViewInjectionData, reloadTaskAction
} from '@netgrif/components-core';
import {MatDialog} from "@angular/material/dialog";

export const openTaskDialog: FrontActionDefinition = {
    call: (injector: Injector, frontAction: FrontAction) => {
        const dialogComponent = injector.get(NAE_TASK_VIEW_COMPONENT);
        const dialog = injector.get(MatDialog);
        const ref = dialog.open(dialogComponent, {
            panelClass: "dialog-task-responsive",
            data: {
                taskIds: frontAction.args[0]
            } as TaskViewInjectionData,
        });
        ref.afterClosed().subscribe(event => {
            reloadTaskAction.call(injector, frontAction)
        });
    }
}
