import {ValidatorFn} from "@angular/forms";
import {FieldTypeResource} from "../../task-content/model/field-type-resource";

export interface Validator {
    key: string;
    attributeNames: string[];
    fn: (...args: string[]) => ValidatorFn;
    validationErrorKey: string;
    defaultErrorMessage: (...args: string[]) => string;
    defaultErrorMessageParams?: Object;
}
