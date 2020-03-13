import {DataField} from '../../../data-fields/abstract-data-field';

export interface GridLayoutElement {
    item: DataField<any>;
    type: string;
    layout: {
        x: number;
        y: number;
        cols: number;
        rows: number;
    };
}
