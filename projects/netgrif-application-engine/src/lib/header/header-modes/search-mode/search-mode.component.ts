import {Component, Input, OnInit} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'nae-search-mode',
    templateUrl: './search-mode.component.html',
    styleUrls: ['./search-mode.component.scss']
})
export class SearchModeComponent implements OnInit {

    /**
     * The time that must elapse since last keypress in search input before a search request is sent
     */
    private SEARCH_DEBOUNCE_TIME = 200;

    public formControls: Array<FormControl> = [];

    @Input()
    public headerService: AbstractHeaderService;

    constructor() {
    }

    ngOnInit() {
        this.headerService.headerColumnCount$.subscribe(newCount => this.updateHeaderCount(newCount));
    }

    private updateHeaderCount(newCount: number): void {
        if (newCount < this.formControls.length) {
            this.formControls = this.formControls.slice(0, newCount);
            return;
        }

        while (this.formControls.length < newCount) {
            const formControl = new FormControl();
            const i = this.formControls.length;
            formControl.valueChanges.pipe(debounceTime(this.SEARCH_DEBOUNCE_TIME)).subscribe(value => {
                this.headerService.headerSearchInputChanged(i, value);
            });
            this.formControls.push(formControl);
        }
    }
}
