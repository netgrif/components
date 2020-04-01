import {Author} from './author';
import {PetriNetObjectId} from './petri-net-object-id';
import {ImmediateData} from './immediate-data';
import DateTimeFormat = Intl.DateTimeFormat;

export interface Case {
    lastModified: DateTimeFormat;
    visualId: string;
    petriNetObjectId: PetriNetObjectId;
    processIdentifier: string;
    title: string;
    color: string;
    creationDate: DateTimeFormat;
    immediateData: Array<ImmediateData>;
    author: Author;
    resetArcTokens: object;
    stringId: string;
    petriNetId: string;
    icon: string;
}


