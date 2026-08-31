import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HeaderColumn} from "../models/header-column";
import {AbstractHeaderService} from "../abstract-header-service";
import {HeaderSortingMode} from "../models/header-sorting-mode";
import {HeaderMode} from "../models/header-mode";

@Component({
    selector: 'ncc-abstract-header-mode',
    template: ''
})
export abstract class AbstractHeaderModeComponent {

    @Input() public overflowWidth: string;
    @Input() public approval: boolean;
    @Input() public indeterminate: boolean;
    @Input() public approvalFormControl: FormControl<boolean>;
    @Input() public typeApproval: string;
    @Input() public headerService: AbstractHeaderService;

    constructor() {
    }

    getMinWidth() {
        return this.overflowWidth;
    }

    public sortingHeaderSelected(newSortingColumn: HeaderColumn | null | undefined): void {
        if (!newSortingColumn) {
            return;
        }

        if (newSortingColumn.sortDirection === 'asc') {
            newSortingColumn.sortDirection = 'desc';
        } else if (newSortingColumn.sortDirection === 'desc') {
            newSortingColumn.sortDirection = '';
        } else {
            newSortingColumn.sortDirection = 'asc';
        }
        this.headerService.sortingColumnSelected(newSortingColumn);
        if (this.headerService.headerState.mode !== HeaderMode.EDIT) {
            this.headerService.applySelectedSorts();
        }
    }

    public sortingPriority(header: HeaderColumn | null | undefined): number | null {
        if (!header?.sortDirection || this.headerService.sortingMode === HeaderSortingMode.SINGLE || (this.headerService.sortingMode === HeaderSortingMode.COMBINED && this.headerService.headerState.mode === HeaderMode.SORT)) {
            return null;
        }

        const index = this.headerService.headerState.selectedSorts.indexOf(header);
        return index === -1 ? null : index + 1;
    }
}
