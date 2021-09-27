import {DatafieldGridLayoutElement} from './datafield-grid-layout-element';

/**
 * A configuration for one subgrid - a basic layouting unit
 */
export interface Subgrid {
    /**
     * Number of columns of the subgrid
     */
    cols: number;
    /**
     * the css `gridAreas` configuration, that determines the layout of the grids content
     */
    gridAreas: string;
    /**
     * The elements that are contained in the subgrid
     */
    content: Array<DatafieldGridLayoutElement>;
}
