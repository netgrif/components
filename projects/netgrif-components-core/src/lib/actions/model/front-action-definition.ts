import {Injector} from "@angular/core";
import {FrontAction} from "../../data-fields/models/changed-fields";

export interface FrontActionDefinition {
    fn: (injector: Injector, frontAction: FrontAction) => void;
}
