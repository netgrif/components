import {Injector} from "@angular/core";
import {FrontAction} from "../../data-fields/models/changed-fields";

export interface FrontActionDefinition {
    call: (injector: Injector, frontAction: FrontAction) => void;
}
