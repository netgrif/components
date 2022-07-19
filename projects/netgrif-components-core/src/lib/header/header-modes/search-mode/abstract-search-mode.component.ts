import {Component, Input, OnDestroy, OnInit, Type} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';
import {FormControl} from '@angular/forms';
import {debounceTime, map} from 'rxjs/operators';
import {UserValue} from '../../../data-fields/user-field/models/user-value';
import {SideMenuService} from '../../../side-menu/services/side-menu.service';
import {Subscription} from 'rxjs';
import {AbstractHeaderModeComponent} from '../abstract-header-mode.component';

@Component({
    selector: 'ncc-abstract-seatch-mode',
    template: ''
})
export abstract class AbstractSearchModeComponent extends AbstractHeaderModeComponent implements OnInit, OnDestroy {

    /**
     * The time that must elapse since last keypress in search input before a search request is sent
     */
    protected SEARCH_DEBOUNCE_TIME = 600;
    protected subHeaderColumn: Subscription;
    protected subClearHeader: Subscription;

    public formControls: Array<FormControl> = [];

    @Input()
    public headerService: AbstractHeaderService;

    constructor(protected _sideMenuService: SideMenuService) {
        super();
    }

    ngOnInit() {
        this.subHeaderColumn = this.headerService.headerColumnCount$.subscribe(newCount => this.updateHeaderCount(newCount));
        this.subClearHeader = this.headerService.clearHeaderSearch$.subscribe(columnNumber => this.clearInput(columnNumber));
    }

    ngOnDestroy(): void {
        this.subClearHeader.unsubscribe();
        this.subHeaderColumn.unsubscribe();
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
    protected updateHeaderCount(newCount: number): void {
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
    protected addNewColumn(): void {
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
     * @param component is the component that we want to open
     */
    public selectAbstractUser(column: number, component: Type<any>): void {
        let valueReturned = false;
        this._sideMenuService.open(component).onClose.subscribe($event => {
            if ($event.data) {
                this.formControls[column].setValue(($event.data as UserValue).fullName);
                this.formControls[column].setValue($event.data as UserValue, {emitModelToViewChange: false});
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
    protected clearInput(column: number): void {
        if (column >= 0 && column < this.formControls.length) {
            this.formControls[column].setValue(undefined);
        }
    }
}
