import {Behavior} from './behavior';

/**
 * Map that contains the infromation about changes to all data fields of a Case. Keys are data field IDs.
 *
 * See [TaskResourceService.setData()]{@link TaskResourceService#setData}.
 */
export interface ChangedFields {
    [key: string]: Change;
}

/**
 * Describes changes made to the state of one data field of a Case by the backend.
 * State of the respective fields should be changed accordingly.
 */
export interface Change {
    /**
     * New value for the field.
     */
    value?: string | number | boolean | any;
    /**
     * New behavior for the field
     */
    behavior?: Behaviors;

    /**
     * @ignore
     */
    [key: string]: any;
}

/**
 * Map that contains the information about behavior change for each transition in the underlying PetriNet model.
 * Keys are Transition IDs.
 */
export interface Behaviors {
    [key: string]: Behavior;
}
