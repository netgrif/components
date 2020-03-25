import {Author} from './author';
import {DataDescription} from './data-description';

/**
 * Interface for representation one Petri net model
 */
export interface PetriNetReference {
    stringId: string;
    title: string;
    identifier: string;
    version: string;
    initials: string;
    defaultCaseName: string;
    createdDate: Date;
    author: Author;
    immediateData: Array<DataDescription>;
}
