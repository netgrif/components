import {Component, Input, OnInit} from '@angular/core';
import {Filter} from '../../../../filter/models/filter';

/**
 * @ignore
 * Renders a single filter in the selection list.
 */
@Component({
    selector: 'ncc-abstract-filter-selector-list-item',
    template: ''
})
export abstract class AbstractFilterSelectorListItemComponent implements OnInit {

    /**
     * Filter that should be rendered
     */
    @Input() filter: Filter;
    /**
     * Text that is bound to HTML
     */
    public text: string;

    /**
     * Sets the text bound to HTML, to either the filter title (if it exists), or to it's ID.
     */
    ngOnInit(): void {
        if (this.filter.title) {
            this.text = this.filter.title;
        } else {
            this.text = this.filter.id;
        }
    }

}
