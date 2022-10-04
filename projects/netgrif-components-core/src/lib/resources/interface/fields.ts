import {Behavior} from '../../data-fields/models/behavior';

/**
 * @ignore
 */
export interface Fields {
    _embedded: TypeLocalisadField;

}

/**
 * Type Field
 */
export interface TypeLocalisadField {
    /**
     * Array [LocalisedBooleanFields]{@link LocalisedBooleanFields}
     */
    localisedBooleanFields?: Array<LocalisedBooleanFields>;
    /**
     * Array [LocalisedTextFields]{@link LocalisedTextFields}
     */
    localisedTextFields?: Array<LocalisedTextFields>;
    /**
     * Array [LocalisedNumberFields]{@link LocalisedNumberFields}
     */
    localisedNumberFields?: Array<LocalisedNumberFields>;
    /**
     * Array [LocalisedEnumerationFields]{@link LocalisedEnumerationFields}
     */
    localisedEnumerationFields?: Array<LocalisedEnumerationFields>;
    /**
     * Array [LocalisedMultichoiceFields]{@link LocalisedMultichoiceFields}
     */
    localisedMultichoiceFields?: Array<LocalisedMultichoiceFields>;
    /**
     * Array [LocalisedFields]{@link LocalisedFields}
     */
    localisedFields?: Array<LocalisedFields>;
    /**
     * Array [LocalisedUserFields]{@link LocalisedUserFields}
     */
    localisedUserFields?: Array<LocalisedUserFields>;
    /**
     * Array [LocalisedDateFields]{@link LocalisedDateFields}
     */
    localisedDateFields?: Array<LocalisedDateFields>;

}

/**
 * Boolean Field
 */
export interface LocalisedBooleanFields {
    /**
     * ID
     */
    stringId: string;
    /**
     * Type of field
     */
    type: string;
    /**
     * Name
     */
    name: string;
    /**
     * [Behavior]{@link Behavior}
     */
    behavior: Behavior;
    value: boolean;
    order: number;
    defaultValue?: boolean;
}

/**
 * Text Field
 */
export interface LocalisedTextFields {
    /**
     * ID
     */
    stringId: string;
    /**
     * Type of field
     */
    type: string;
    /**
     * Name
     */
    name: string;
    /**
     * [Behavior]{@link Behavior}
     */
    behavior: Behavior;
    value: string;
    order: number;
    subType: string;
}

/**
 * Number Field
 */
export interface LocalisedNumberFields {
    /**
     * ID
     */
    stringId: string;
    /**
     * Type of field
     */
    type: string;
    /**
     * Name
     */
    name: string;
    /**
     * [Behavior]{@link Behavior}
     */
    behavior: Behavior;
    value: number;
    order: number;
    minValue?: number;
    validationJS?: string;
    validationErrors?: ValidationErrors;
    defaultValue?: number;
}

/**
 * Enumeration Field
 */
export interface LocalisedEnumerationFields {
    /**
     * ID
     */
    stringId: string;
    /**
     * Type of field
     */
    type: string;
    /**
     * Name
     */
    name: string;
    /**
     * [Behavior]{@link Behavior}
     */
    behavior: Behavior;
    value: string;
    order: number;
    choices: Array<string>;
    defaultValue?: string;
}

/**
 * Multichoice Field
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
 * Date Field
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
 * Field
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
 * User Field
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

export interface ValidationErrors {
    between?: boolean;
    inrange?: boolean;
    email?: boolean;
}
