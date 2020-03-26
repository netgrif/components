import {Author} from './author';
import {Links} from './links';
import {DataDescription} from '../../header/models/data-description';

export interface PetriNetReferences {
    stringId: string;
    title: string;
    identifier: string;
    version: string;
    defaultCaseName?: string;
    createdDate: Date;
    author: Author;
    immediateData: Array<DataDescription>;
    _links: Links;
}
