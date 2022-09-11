import {Position} from './position';
import {ArcType} from './arc-type';

export interface ArcImport {
    destinationId: string;
    sourceId: string;
    importId: string;
    multiplicity: number;
    stringId: string;
    breakpoints: Array<Position>;
    type: ArcType;
}
