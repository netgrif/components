import {Component, Input} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';
import {Sort} from '@angular/material';

@Component({
    selector: 'nae-sort-mode',
    templateUrl: './sort-mode.component.html',
    styleUrls: ['./sort-mode.component.scss']
})
export class SortModeComponent {

    @Input()
    public headerService: AbstractHeaderService;

    constructor() {
    }

    public sortHeaderChanged(sortEvent: Sort): void {
        const firstDash = sortEvent.active.indexOf('-');
        this.headerService.sortHeaderChanged(
            parseInt(sortEvent.active.substring(0, firstDash), 10),
            sortEvent.active.substr(firstDash + 1, sortEvent.active.length),
            sortEvent.direction);
    }

}


