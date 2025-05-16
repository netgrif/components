import {ImmediateData} from './immediate-data';
import {NaeDate} from '../types/nae-date-type';
import {PermissionsWrapper} from '../../process/permissions'

/**
 * Information Petri Net
 */
export interface PetriNetReference {
    /**
     * Mongo ID
     */
    stringId: string;
    /**
     * Title
     */
    title: string;
    /**
     * Identifier
     */
    identifier: string;
    /**
     * Uri node ID
     */
    uriNodeId: string;
    /**
     * Version net
     */
    version: string;
    /**
     * Initials
     *
     * Max 3 Char
     */
    initials: string;
    /**
     * Name new Case Default Name
     */
    defaultCaseName: string;
    /**
     * Date import
     */
    createdDate: NaeDate;
    /**
     * actor id of the author
     */
    authorId: string;
    /**
     * [ImmediateData]{@link ImmediateData}
     */
    immediateData: Array<ImmediateData>;
    /**
     * **Example:** {}
     */
    processRolePermissions: PermissionsWrapper;
}

