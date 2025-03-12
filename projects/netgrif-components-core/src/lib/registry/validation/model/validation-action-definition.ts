
import {ValidatorFn} from '@angular/forms';
import {Injector} from '@angular/core';
import {Argument, Value} from "../../../data-fields/models/validation";

export interface ValidationActionDefinition {
    call: (injector: Injector, validAction: ValidationAction) => ValidatorFn;
}

export interface ValidationAction {
    name: string;
    arguments?: Array<Value>;
}
