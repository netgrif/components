import {ValidatorFn} from "@angular/forms";
import {FieldTypeResource} from "../../task-content/model/field-type-resource";

export interface Validator {
    key: string;
    fieldType: FieldTypeResource;
    attributeNames: string[];
    validityError: string;
    fn: (...args: string[]) => ValidatorFn;

}
