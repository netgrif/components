import {Component, Input, OnInit} from '@angular/core';
import {Filter} from '../../../../filter/models/filter';

@Component({
    selector: 'nae-filter-selector-list-item',
    templateUrl: './filter-selector-list-item.component.html',
    styleUrls: ['./filter-selector-list-item.component.scss']
})
export class FilterSelectorListItemComponent implements OnInit {

    @Input() filter: Filter;
    public text: string;

    constructor() {
    }

    ngOnInit(): void {
        if (this.filter.title) {
            this.text = this.filter.title;
        } else {
            this.text = this.filter.id;
        }
    }

}
