import {Component, Input} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';

@Component({
    selector: 'nae-search-mode',
    templateUrl: './search-mode.component.html',
    styleUrls: ['./search-mode.component.scss']
})
export class SearchModeComponent {

    @Input()
    public headerService: AbstractHeaderService;

    constructor() {
    }

    public headerSearchInputChanged(columnIndex: number, searchInput: any) {
        this.headerService.headerSearchInputChanged(columnIndex, searchInput);
    }
}
