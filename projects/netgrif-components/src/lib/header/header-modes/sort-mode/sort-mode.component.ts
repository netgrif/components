import {Component} from '@angular/core';
import {AbstractSortModeComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-sort-mode',
    templateUrl: './sort-mode.component.html',
    styleUrls: ['./sort-mode.component.scss'],
    standalone: false
})
export class SortModeComponent extends AbstractSortModeComponent {
    constructor() {
        super();
    }

    public setValue() {
        this.approvalFormControl.setValue(true);
    }
}


