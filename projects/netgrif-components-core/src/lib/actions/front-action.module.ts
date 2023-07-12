import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FrontActionsRegistryService} from "../registry/front-actions-registry.service";
import {redirectAction, reloadTaskAction, validateTaskAction} from "./model/front-action-definitions";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FrontActionModule {

    constructor(frontActionsRegistry: FrontActionsRegistryService) {
        frontActionsRegistry.register('redirect', redirectAction);
        frontActionsRegistry.register('validate', validateTaskAction);
        frontActionsRegistry.register('reloadTask', reloadTaskAction);
    }
}
