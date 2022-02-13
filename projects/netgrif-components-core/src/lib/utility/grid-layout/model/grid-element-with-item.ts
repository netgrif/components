import {GridElement} from './grid-element';

export interface GridElementWithItem<T> extends GridElement {
    item?: T;
}
