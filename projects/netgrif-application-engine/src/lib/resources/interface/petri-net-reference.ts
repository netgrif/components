import {Author} from './author';
import {ImmediateData} from './immediate-data';
import {NaeDate} from '../types/nae-date-type';

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
     * [Author]{@link Author}
     */
    author: Author;
    /**
     * [ImmediateData]{@link ImmediateData}
     */
    immediateData: Array<ImmediateData>;
    /**
     * [ImmediateData]{@link ImmediateData}
     */
    staticImmediateData: Array<ImmediateData>;
}

