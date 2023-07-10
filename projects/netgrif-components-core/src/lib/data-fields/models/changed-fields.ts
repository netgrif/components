import {Behavior} from './behavior';

/**
 * response example:
 *  {"changedFields": {
 *      "text_1":{"behavior":{"1":{"editable":true}}},
 *     "text_0":{"behavior":{"1":{"visible":true}}},
 *      "text_3":{"behavior":{"1":{"editable":true,"optional":true}}},
 *      "text_2":{"behavior":{"1":{"editable":true,"required":true}}},
 *      "text_5":{"behavior":{"1":{"forbidden":true}}},
 *      "text_4":{"behavior":{"1":{"hidden":true}}}
 *  }}
 *
 *  1 ==> transition ID
 *
 *  it might be better if some parent element gave only the relevant changes to each task
 */
export interface ChangedFields {
    /**
     * `StringId` of the `Task` that "owns" the requested frontend actions
     */
    frontendActionsOwner?: string;

    /**
     * Has type `Change` unless it is `frontendActionsOwner` in which case the type is `string`
     */
    [key: string]: Change | any;

    /**
     * Id of task on which the changes occured
     */
    taskId?: string;
}

export interface Change {
    value?: string | number | boolean | any;
    type?: string;
    // behavior  contains information about transition id
    behavior?: {
        [key: string]: Behavior
    };

    [key: string]: any;

    action?: FrontAction
}

export interface FrontAction {
    id: string;
    args: {
        [k: string]: object;
    }
}

/**
 * A prototype implementation of frontend actions.
 *
 * The specifics are subject to change.
 */
export type FrontendActions = Change;
