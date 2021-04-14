import {FieldTypeResource} from '../../task-content/model/field-type-resource';

/**
 * Represents a value featured on a panel
 */
export interface FeaturedValue {
    value: string;
    icon: string;
    type: FieldTypeResource | 'meta' | '';
}
