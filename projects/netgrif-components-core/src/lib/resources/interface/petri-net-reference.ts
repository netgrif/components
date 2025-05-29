import {ImmediateData} from './immediate-data';
import {NaeDate} from '../types/nae-date-type';
import {PermissionsWrapper} from '../../process/permissions'
import {MapWrapper} from "./map-wrapper";
import {Properties} from "../../data-fields/models/properties";

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

    // todo 2058 doc
    properties: MapWrapper<Properties>
}

