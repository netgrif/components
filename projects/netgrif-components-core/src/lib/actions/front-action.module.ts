import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FrontActionRegistryService} from "../registry/front-action-registry.service";
import {redirectAction, snackBarAction} from "./model/router-action-definitions";
import {reloadTaskAction, validateTaskAction} from "./model/task-action-definitions";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FrontActionModule {

    constructor(frontActionsRegistry: FrontActionRegistryService) {
        frontActionsRegistry.register('redirect', redirectAction);
        frontActionsRegistry.register('validate', validateTaskAction);
        frontActionsRegistry.register('reloadTask', reloadTaskAction);
        frontActionsRegistry.register('snackBar', snackBarAction);
    }
}
