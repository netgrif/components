import {HeaderColumn} from './header-column';


export interface FieldsGroup {
    /**
     * Meta data use title "META DATA".
     * Immediate data use identifier of their Petri net.
     */
    groupTitle: string;
    fields: Array<HeaderColumn>;
}
