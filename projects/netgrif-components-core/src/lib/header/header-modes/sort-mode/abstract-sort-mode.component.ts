import {Component} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {AbstractHeaderModeComponent} from '../abstract-header-mode.component';
import {HeaderColumn} from "../../models/header-column";


@Component({
    selector: 'ncc-abstract-sort-mode',
    template: ''
})
export abstract class AbstractSortModeComponent extends AbstractHeaderModeComponent {

    constructor() {
        super();
    }

    public sortHeaderChanged(sortEvent: Sort): void {
        const firstDash = sortEvent.active.indexOf('-');
        this.headerService.sortHeaderChanged(
            parseInt(sortEvent.active.substring(0, firstDash), 10),
            sortEvent.active.substr(firstDash + 1, sortEvent.active.length),
            sortEvent.direction);
    }

    public sortingHeaderSelected(newSortingColumn: HeaderColumn | null | undefined): void {
        if (!this.advanceSortDirection(newSortingColumn)) {
            return;
        }

        this.headerService.sortingColumnSelected(newSortingColumn);
        this.headerService.updateSortMode();
    }

}
