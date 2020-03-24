import {FieldBehavior} from './field-behavior';

export interface Fields {
    _embedded: TypeLocalisadField;

}

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

export interface LocalisedBooleanFields {
    stringId: string;
    type: string;
    name: string;
    behavior: FieldBehavior;
    value: boolean;
    order: number;
    view: FieldView;
    defaultValue?: boolean;
}

export interface LocalisedTextFields {
    stringId: string;
    type: string;
    name: string;
    behavior: FieldBehavior;
    value: string;
    order: number;
    subType: string;
}

export interface LocalisedNumberFields {
    stringId: string;
    type: string;
    name: string;
    behavior: FieldBehavior;
    value: number;
    order: number;
    minValue?: number;
    validationJS?: string;
    validationErrors?: ValidationErrors;
    defaultValue?: number;
}

export interface LocalisedEnumerationFields {
    stringId: string;
    type: string;
    name: string;
    behavior: FieldBehavior;
    value: string;
    order: number;
    choices: Array<string>;
    defaultValue?: string;
}

export interface LocalisedMultichoiceFields {
    stringId: string;
    type: string;
    name: string;
    description: string;
    placeholder: string;
    behavior: FieldBehavior;
    value: Array<string> | string;
    order: number;
    choices: Array<string> | string;
    defaultValue?: Array<string> | string;
}

export interface LocalisedDateFields {
    stringId: string;
    type: string;
    name: string;
    description?: string;
    placeholder?: string;
    behavior: FieldBehavior;
    value: Array<number> | number | Date;
    order: number;
    minDate?: string;
    validationJS?: string;
    validationErrors?: ValidationErrors;
}

export interface LocalisedFields {
    stringId: string;
    type: string;
    name: string;
    description: string;
    placeholder: string;
    behavior: FieldBehavior;
    value: FileFieldValue | Array<number>;
    order: number;
}

export interface LocalisedUserFields {
    stringId: string;
    type: string;
    name: string;
    description: string;
    placeholder: string;
    behavior: FieldBehavior;
    order: number;
    roles: Array<string>;

}

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
