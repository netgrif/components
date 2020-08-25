import {Component} from '@angular/core';
import {AbstractSortModeComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-sort-mode',
    templateUrl: './sort-mode.component.html',
    styleUrls: ['./sort-mode.component.scss']
})
export class SortModeComponent extends AbstractSortModeComponent {
    constructor() {
        super();
    }
}


