import {Component, OnInit} from '@angular/core';
import {AbstractLoadFilterComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-load-filter',
    templateUrl: './load-filter.component.html',
    styleUrls: ['./load-filter.component.scss']
})
export class LoadFilterComponent extends AbstractLoadFilterComponent {

    constructor() {
    }
}
