import {Position} from './position';

export interface PlaceImport {
    importId: string;
    isStatic: boolean;
    position: Position;
    stringId: string;
    title: object;
    tokens: number;
}
