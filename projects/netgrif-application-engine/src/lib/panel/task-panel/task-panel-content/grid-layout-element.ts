import {DataField} from '../../../data-fields/models/abstract-data-field';

export interface GridLayoutElement {
    item: DataField<any>;
    type: string;
    layout: {
        x: number;
        y: number;
        cols: number;
        rows: number;
    };
    title?: string;
}
