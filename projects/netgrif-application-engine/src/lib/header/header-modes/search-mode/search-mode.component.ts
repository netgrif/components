import {Component, Input, OnInit} from '@angular/core';
import {Headers} from '../../headers';
import {AbstractHeaderService} from '../../abstract-header-service';
import {MatDatepickerInputEvent} from '@angular/material';

@Component({
    selector: 'nae-search-mode',
    templateUrl: './search-mode.component.html',
    styleUrls: ['./search-mode.component.scss']
})
export class SearchModeComponent implements OnInit {

    public headers: Headers;
    @Input()
    public headerService: AbstractHeaderService;

    constructor() {
    }

    ngOnInit(): void {
        this.headers = this.headerService.headers;
    }

    public onUserKeyupSearch(columnId: string, searchedQuery: any) {
        this.headers = this.headerService.onUserSearch(columnId, searchedQuery);
    }

    public onUserDateSearch(columnId: string, event: MatDatepickerInputEvent<any>) {
        this.headers = this.headerService.onUserSearch(columnId, event.value);
    }


    public getIterableHeaders() {
        return {...this.headers.selected};
    }
}
