import {Component, Inject} from '@angular/core';
import {AbstractFilterSelectorComponent, FilterRepository, NAE_SIDE_MENU_CONTROL, SideMenuControl} from '@netgrif/components-core';

/**
 *
 * @deprecated
 * Allows user to choose a {@link Filter} from the {@link FilterRepository}.
 *
 * Publishes events to the {@link SideMenuControl} object when:
 *
 * - filter is selected by the user. Message: `New selected filter`, Data: is either the selected filter or `undefined` if the user
 * deselected the filter
 *
 * - filter selection is confirmed by the user. Message: `Selected filter was confirmed`, Data: the selected filter. If the user didn't
 * select any filter this event will not be published.
 *
 */
@Component({
    selector: 'nc-filter-selector',
    templateUrl: './filter-selector.component.html',
    styleUrls: ['./filter-selector.component.scss']
})
export class FilterSelectorComponent extends AbstractFilterSelectorComponent {
    /**
     * Retrieves the {@link Filter} objects from the {@link FilterRepository} and instantiates this component.
     *
     * Filters that are available for selection can be set using the injected data. See {@link FilterSelectorInjectionData}
     * for more information.
     * @param _sideMenuControl -
     * @param _filterRepository -
     */
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                protected _filterRepository: FilterRepository) {
        super(_sideMenuControl, _filterRepository);
    }

}
