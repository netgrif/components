import {FilterField} from '../../data-fields/filter-field/models/filter-field';

/**
 * Represents a value featured on a panel
 */
export interface FeaturedValue {
    value: string;
    icon: string;
    type: string;
    /**
     * Only for immediate filter fields
     */
    filterField?: FilterField;
}
