import {Author} from './author';
import {Links} from './links';

/**
 * Object from Backend
 */
export interface PetriNetReferences {
    stringId: string;
    title: string;
    identifier: string;
    version: string;
    defaultCaseName?: string;
    createdDate: Date;
    author: Author;
    immediateData: Array<string>;
    _links: Links;
}


