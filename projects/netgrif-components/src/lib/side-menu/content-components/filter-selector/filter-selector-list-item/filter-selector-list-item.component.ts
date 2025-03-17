import {Component} from '@angular/core';
import {AbstractFilterSelectorListItemComponent} from '@netgrif/components-core';

/**
 * @ignore
 * Renders a single filter in the selection list.
 */
@Component({
    selector: 'nc-filter-selector-list-item',
    templateUrl: './filter-selector-list-item.component.html',
    styleUrls: ['./filter-selector-list-item.component.scss'],
    standalone: false
})
export class FilterSelectorListItemComponent extends AbstractFilterSelectorListItemComponent {

}
