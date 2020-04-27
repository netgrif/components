import {Author} from './author';
import {ImmediateData} from './immediate-data';

export interface PetriNetReference {
    stringId: string;
    title: string;
    identifier: string;
    version: string;
    initials: string;
    defaultCaseName: string;
    createdDate: Array<number>;
    author: Author;
    immediateData: Array<ImmediateData>;
}

