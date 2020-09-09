import {DatafieldGridLayoutElement} from './datafield-grid-layout-element';

/**
 * Holds information that can be used to populate the tasks grid layout with components
 */
export interface GridData {
    grid: Array<Array<string>>;
    gridElements: Array<DatafieldGridLayoutElement>;
}
