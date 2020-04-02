import {DataDescription} from './data-description';


/**
 * Interface for representation data groups in select in workflow header edit mode
 */
export interface FieldsGroup {
    /**
     * Type defines the title for the division of meta data and immediate data.
     * For meta data is used title "META DATA".
     * For immediate data is used Petri net identifier where data belongs.
     */
    type: string;
    fields: Array<DataDescription>;
}
