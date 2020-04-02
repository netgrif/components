import {Component, Input, OnInit} from '@angular/core';
import {HeaderState} from '../../header-state';
import {AbstractHeaderService} from '../../abstract-header-service';

@Component({
    selector: 'nae-search-mode',
    templateUrl: './search-mode.component.html',
    styleUrls: ['./search-mode.component.scss']
})
export class SearchModeComponent implements OnInit {

    public headers: HeaderState;
    @Input()
    public headerService: AbstractHeaderService;

    constructor() {
    }

    ngOnInit(): void {
        this.headers = this.headerService.headerState;
    }

    public onUserSearch(columnId: string, searchedQuery: any) {
        this.headers = this.headerService.onUserSearch(columnId, searchedQuery);
    }

    public getIterableHeaders() {
        return {...this.headers.selectedHeaders$};
    }
}
