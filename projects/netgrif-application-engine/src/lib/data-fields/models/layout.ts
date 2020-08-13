import {GridLayout} from '../../utility/grid-layout/model/grid-element';
import {TemplateAppearance} from './template-appearance';
import {MaterialAppearance} from './material-appearance';

/**
 * Layout information for the data field.
 */
export interface Layout extends GridLayout {
    /**
     * Determines how much space the form field occupies.
     */
    template: TemplateAppearance;
    /**
     * Determines the appearance of the form field.
     */
    appearance: MaterialAppearance;
    offset: number;
}
