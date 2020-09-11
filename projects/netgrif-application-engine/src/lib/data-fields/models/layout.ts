import {GridLayout} from '../../utility/grid-layout/model/grid-element';
import {TemplateAppearance} from './template-appearance';
import {MaterialAppearance} from './material-appearance';
import {FieldAlignment} from '../../resources/interface/field-alignment';

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
    /**
     * Determines the vertical alignment of the field within its designated space
     */
    alignment?: FieldAlignment;
}
