import {Author} from './author';
import {PetriNetObjectId} from './petri-net-object-id';
import {ImmediateData} from './immediate-data';
import {NaeDate} from '../types/nae-date-type';

export interface Case {
    lastModified: NaeDate;
    visualId: string;
    petriNetObjectId: PetriNetObjectId;
    processIdentifier: string;
    title: string;
    color: string;
    creationDate: NaeDate;
    immediateData: Array<ImmediateData>;
    author: Author;
    resetArcTokens: object;
    stringId: string;
    petriNetId: string;
    icon: string;
}


