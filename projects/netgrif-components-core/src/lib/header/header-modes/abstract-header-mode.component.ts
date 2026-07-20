import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

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

    constructor() {
    }

    getMinWidth() {
        return this.overflowWidth;
    }
}
