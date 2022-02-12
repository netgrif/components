import {Input} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';
import {Sort} from '@angular/material/sort';
import {AbstractHeaderModeComponent} from '../abstract-header-mode.component';

export abstract class AbstractSortModeComponent extends AbstractHeaderModeComponent {

    @Input()
    public headerService: AbstractHeaderService;

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

}


