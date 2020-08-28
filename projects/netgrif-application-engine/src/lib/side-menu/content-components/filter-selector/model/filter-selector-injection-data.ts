import {SideMenuInjectionData} from '../../../models/side-menu-injection-data';
import {FilterType} from '../../../../filter/models/filter-type';

/**
 * Objects of this type can be used to constrain filters listed in {@link AbstractFilterSelectorComponent}.
 *
 * If no constraints are provided, all filters from {@link FilterRepository} will be displayed.
 *
 * If both constraints are provided and [listed filter IDs]{@link FilterSelectorInjectionData#filterIdsConstraint} are not
 * of a single [type]{@link FilterSelectorInjectionData#filterTypeConstraint}, only the filters of the specified type will be displayed.
 */
export interface FilterSelectorInjectionData extends SideMenuInjectionData {
    /**
     * Constrains filters shown in {@link AbstractFilterSelectorComponent} to a single type.
     */
    filterTypeConstraint?: FilterType;
    /**
     * Constrains filters shown in {@link AbstractFilterSelectorComponent} to specific filters, by their IDs.
     */
    filterIdsConstraint?: Array<string>;
}
