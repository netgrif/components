import {Component, Input, OnInit} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';
import {HeaderState} from '../../header-state';

@Component({
    selector: 'nae-sort-mode',
    templateUrl: './sort-mode.component.html',
    styleUrls: ['./sort-mode.component.scss']
})
export class SortModeComponent implements OnInit {

    public headers: HeaderState;
    @Input()
    public headerService: AbstractHeaderService;

    constructor() {
    }

    ngOnInit(): void {
        this.headers = this.headerService.headerState;
    }

    /**
     * Subscribe user column change
     * @param active Represents column identifier
     * @param direction Represent one of sort modes: asd, desc and ''
     */
    public onSortModeEdit({active, direction}): void {
        this.headers = this.headerService.onSortModeEdit({active, direction});
    }

    public getIterableHeaders() {
        return Object.values(this.headers.selectedHeaders$);
    }

}


