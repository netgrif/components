import {Position} from './position';

export interface ArcImport {
    destinationId: string;
    sourceId: string;
    importId: string;
    multiplicity: number;
    stringId: string;
    breakpoints: Array<Position>;
    type: string;
}
