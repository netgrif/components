import {Injector} from "@angular/core";
import {FrontAction} from "./changed-fields";

export interface FrontActionDefinition {
    fn: (injector: Injector, frontAction: FrontAction) => void;
}
