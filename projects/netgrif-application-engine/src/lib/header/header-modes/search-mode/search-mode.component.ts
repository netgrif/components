import {Component, Input, OnInit} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';
import {FormControl} from '@angular/forms';
import {debounceTime, map} from 'rxjs/operators';
import {MAT_DATE_FORMATS} from '@angular/material';
import {DATE_FORMAT} from '../../../moment/time-formats';
import {UserAssignComponent} from '../../../side-menu/content-components/user-assign/user-assign.component';
import {UserValue} from '../../../data-fields/user-field/models/user-value';
import {SideMenuService} from '../../../side-menu/services/side-menu.service';

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
    private SEARCH_DEBOUNCE_TIME = 350;

    public formControls: Array<FormControl> = [];

    @Input()
    public headerService: AbstractHeaderService;

    constructor(private _sideMenuService: SideMenuService) {
    }

    ngOnInit() {
        this.headerService.headerColumnCount$.subscribe(newCount => this.updateHeaderCount(newCount));
        this.headerService.clearHeaderSearch$.subscribe(columnNumber => this.clearInput(columnNumber));
    }

    /**
     * Updates the underlying objects to match the new desired number of columns.
     *
     * If the new number of columns is greater than the current one, the columns will be filled with default/blank values.
     *
     * If the new number of columns is smaller than the current one, the superfluous columns will be removed.
     *
     * @param newCount the new number of columns
     */
    private updateHeaderCount(newCount: number): void {
        if (newCount < this.formControls.length) {
            this.formControls = this.formControls.slice(0, newCount);
            return;
        }

        while (this.formControls.length < newCount) {
            this.addNewColumn();
        }
    }

    /**
     * Adds a new column to the headers search and binds it's FormControl to the service
     */
    private addNewColumn(): void {
        const formControl = new FormControl();
        const i = this.formControls.length;
        formControl.valueChanges.pipe(
            debounceTime(this.SEARCH_DEBOUNCE_TIME),
            map(value => value instanceof UserValue ? value.id : value)
        ).subscribe(value => {
            this.headerService.headerSearchInputChanged(i, value);
        });
        this.formControls.push(formControl);
    }

    /**
     * Opens a user assign side menu component and sets the selected user as value of the form control object
     * that corresponds to the given column.
     *
     * If no user is selected the value of the corresponding form control si cleared.
     * @param column the index of the columns that should have it's form control value set to the selected user
     */
    public selectUser(column: number): void {
        let valueReturned = false;
        this._sideMenuService.open(UserAssignComponent).onClose.subscribe($event => {
            if ($event.data) {
                this.formControls[column].setValue($event.data as UserValue);
                valueReturned = true;
            } else if (!valueReturned) {
                this.formControls[column].setValue(undefined);
            }
        });
    }

    /**
     * Clears the value of the form control object in the given column
     * @param column the index of the column that should have it's value cleared
     */
    private clearInput(column: number): void {
        if (column >= 0 && column < this.formControls.length) {
            this.formControls[column].setValue(undefined);
        }
    }
}
