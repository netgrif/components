import {DatafieldGridLayoutElement} from './datafield-grid-layout-element';
import {IncrementingCounter} from '../../utility/incrementing-counter';

/**
 * Holds information that can be used to populate the tasks grid layout with components
 */
export interface GridData {
    grid: Array<Array<string>>;
    gridElements: Array<DatafieldGridLayoutElement>;
    runningTitleCount: IncrementingCounter;
}
