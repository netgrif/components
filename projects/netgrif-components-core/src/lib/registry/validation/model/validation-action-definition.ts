
import {ValidatorFn} from '@angular/forms';
import {Injector} from '@angular/core';

export interface ValidationActionDefinition {
    call: (injector: Injector, validAction: ValidationAction) => ValidatorFn;
}

export interface ValidationAction {
    name: string;
    args?: {
        [k: string]: any;
    }
}
