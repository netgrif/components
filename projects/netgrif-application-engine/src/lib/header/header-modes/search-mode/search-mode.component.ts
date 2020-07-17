import {Component, Input, OnInit} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {MAT_DATE_FORMATS} from '@angular/material';
import {DATE_FORMAT} from '../../../moment/time-formats';

@Component({
    selector: 'nae-search-mode',
    templateUrl: './search-mode.component.html',
    styleUrls: ['./search-mode.component.scss'],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ]
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
