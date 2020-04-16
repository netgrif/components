import {FieldBehavior} from './field-behavior';

/**
 * Spring Boot Role
 */
export interface ChangedFieldContainer {
    changedFields: ChangedFields2;
}

/*
response example:
{"changedFields": {
    "text_1":{"behavior":{"1":{"editable":true}}},
    "text_0":{"behavior":{"1":{"visible":true}}},
    "text_3":{"behavior":{"1":{"editable":true,"optional":true}}},
    "text_2":{"behavior":{"1":{"editable":true,"required":true}}},
    "text_5":{"behavior":{"1":{"forbidden":true}}},
    "text_4":{"behavior":{"1":{"hidden":true}}}
}}

1 ==> transition ID

it might be better if some parent element gave only the relevant changes to each task

 */
export interface ChangedFields2 {
    [key: string]: Change2;
}

export interface Change2 {
    value?: string | number | boolean | any;
    /**
     * Behavior is "cleared" and contains information only for one transition
     */
    behavior?: FieldBehavior;
    [key: string]: any;
}
