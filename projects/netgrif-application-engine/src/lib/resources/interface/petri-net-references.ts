import {Author} from './author';
import {Links} from './links';

/**
 * Information Petri Net
 */
export interface PetriNetReferences {
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
     * Name new Case Default Name
     */
    defaultCaseName?: string;
    /**
     * Date import
     */
    createdDate: Date;
    /**
     * [Author]{@link Author}
     */
    author: Author;
    /**
     * Immediate Data
     */
    immediateData: Array<string>;
    _links: Links;
}


