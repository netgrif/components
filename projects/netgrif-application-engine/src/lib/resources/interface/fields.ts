/**
 * @ignore
 */
import {Behavior} from '../../data-fields/models/behavior';

export interface Fields {
    _embedded: TypeLocalisadField;

}
/**
 * Object from Backend
 */
export interface TypeLocalisadField {
    localisedBooleanFields?: Array<LocalisedBooleanFields>;
    localisedTextFields?: Array<LocalisedTextFields>;
    localisedNumberFields?: Array<LocalisedNumberFields>;
    localisedEnumerationFields?: Array<LocalisedEnumerationFields>;
    localisedMultichoiceFields?: Array<LocalisedMultichoiceFields>;
    localisedFields?: Array<LocalisedFields>;
    localisedUserFields?: Array<LocalisedUserFields>;
    localisedDateFields?: Array<LocalisedDateFields>;

}
/**
 * Object from Backend
 */
export interface LocalisedBooleanFields {
    stringId: string;
    type: string;
    name: string;
    behavior: Behavior;
    value: boolean;
    order: number;
    view: FieldView;
    defaultValue?: boolean;
}
/**
 * Object from Backend
 */
export interface LocalisedTextFields {
    stringId: string;
    type: string;
    name: string;
    behavior: Behavior;
    value: string;
    order: number;
    subType: string;
}
/**
 * Object from Backend
 */
export interface LocalisedNumberFields {
    stringId: string;
    type: string;
    name: string;
    behavior: Behavior;
    value: number;
    order: number;
    minValue?: number;
    validationJS?: string;
    validationErrors?: ValidationErrors;
    defaultValue?: number;
}
/**
 * Object from Backend
 */
export interface LocalisedEnumerationFields {
    stringId: string;
    type: string;
    name: string;
    behavior: Behavior;
    value: string;
    order: number;
    choices: Array<string>;
    defaultValue?: string;
}
/**
 * Object from Backend
 */
export interface LocalisedMultichoiceFields {
    stringId: string;
    type: string;
    name: string;
    description: string;
    placeholder: string;
    behavior: Behavior;
    value: Array<string> | string;
    order: number;
    choices: Array<string> | string;
    defaultValue?: Array<string> | string;
}
/**
 * Object from Backend
 */
export interface LocalisedDateFields {
    stringId: string;
    type: string;
    name: string;
    description?: string;
    placeholder?: string;
    behavior: Behavior;
    value: Array<number> | number | Date;
    order: number;
    minDate?: string;
    validationJS?: string;
    validationErrors?: ValidationErrors;
}
/**
 * Object from Backend
 */
export interface LocalisedFields {
    stringId: string;
    type: string;
    name: string;
    description: string;
    placeholder: string;
    behavior: Behavior;
    value: FileFieldValue | Array<number>;
    order: number;
}
/**
 * Object from Backend
 */
export interface LocalisedUserFields {
    stringId: string;
    type: string;
    name: string;
    description: string;
    placeholder: string;
    behavior: Behavior;
    order: number;
    roles: Array<string>;

}
/**
 * Object from Backend
 */
export interface FileFieldValue {
    name: string;
    path: string;
}

export interface FieldView {
    trueImage: string;
    falseImage: string;
}


export interface ValidationErrors {
    between?: boolean;
    inrange?: boolean;
    email?: boolean;
}
