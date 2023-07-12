import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FrontActionsRegistryService} from "../registry/front-actions-registry.service";
import {alertFunction, clickFunction, validateTask} from "./model/front-action-definitions";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FrontActionModule {

    constructor(frontActionsRegistry: FrontActionsRegistryService) {
        frontActionsRegistry.register('redirect', clickFunction)
        frontActionsRegistry.register('validate', validateTask)
        frontActionsRegistry.register('alert', alertFunction)
    }
}
