import {Injector} from "@angular/core";
import {
    FrontActionDefinition,
    FrontAction,
    NAE_TASK_VIEW_COMPONENT, SaveFilterInjectionData,
    TaskViewInjectionData, NAE_SAVE_FILTER_DIALOG_COMPONENT
} from '@netgrif/components-core';
import {MatDialog} from "@angular/material/dialog";

export const openDialog: FrontActionDefinition = {
    fn: (injector: Injector, frontAction: FrontAction) => {
        const dialogComponent = injector.get(NAE_TASK_VIEW_COMPONENT);
        const dialog = injector.get(MatDialog);
        const ref = dialog.open(dialogComponent, {
            panelClass: "dialog-responsive",
            data: {
                taskIds: frontAction.args[0]
            } as TaskViewInjectionData,
        });
        ref.afterClosed().subscribe(event => {
            alert("dialog closed")
        });
    }
}
