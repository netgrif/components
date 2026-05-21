import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import { SelectionBehavior } from "../../panel/configuration/selection-behavior";

@Component({
    selector: 'ncc-abstract-header-mode',
    template: ''
})
export abstract class AbstractHeaderModeComponent {

    @Input() public overflowWidth: string;
    @Input() public indeterminate: boolean;
    @Input() public approvalFormControl: FormControl;
    @Input() public typeApproval: string;
    @Input() public showSelection: SelectionBehavior = SelectionBehavior.HIDDEN;

    constructor() {
    }

    getMinWidth() {
        return this.overflowWidth;
    }

    public isInSelectionMode(): boolean {
        return this.showSelection !== SelectionBehavior.HIDDEN;
    }

    public isSelectionDisabled(): boolean {
        return this.showSelection !== SelectionBehavior.EDITABLE;
    }
}
