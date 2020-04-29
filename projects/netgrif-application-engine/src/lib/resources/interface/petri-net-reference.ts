import {Author} from './author';
import {ImmediateData} from './immediate-data';

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
    createdDate: Array<number>;
    /**
     * [Author]{@link Author}
     */
    author: Author;
    /**
     * Immediate Data [ImmediateData]{@link ImmediateData}
     */
    immediateData: Array<ImmediateData>;
}

