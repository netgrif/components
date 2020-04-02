import {DataDescription} from './data-description';


/**
 * Interface for representation data groups in select in workflow header edit mode
 */
export interface FieldsGroup {
    /**
     * Meta data use title "META DATA".
     * Immediate data use identifier of their Petri net.
     */
    groupTitle: string;
    fields: Array<DataDescription>;
}
