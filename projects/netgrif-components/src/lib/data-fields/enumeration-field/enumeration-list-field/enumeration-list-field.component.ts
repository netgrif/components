import {Component, Inject, Optional, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {
    AbstractEnumerationListFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, EnumerationField
} from '@netgrif/components-core';
import {MatSelectionList, MatSelectionListChange} from '@angular/material/list';

@Component({
    selector: 'nc-enumeration-list-field',
    templateUrl: './enumeration-list-field.component.html',
    styleUrls: ['./enumeration-list-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EnumerationListFieldComponent extends AbstractEnumerationListFieldComponent implements AfterViewInit, OnDestroy {

    @ViewChild(MatSelectionList) list: MatSelectionList;
    protected _valueSub: Subscription;
    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(dataFieldPortalData);
    }

    /** single selection list: the selected option is the value (the list reports an array, the enumeration has one key) */
    select(event: MatSelectionListChange): void {
        const option = event.options[0];
        this.formControlRef.setValue(option?.selected ? option.value : null);
        this.formControlRef.markAsTouched();
    }

    /** the single selection list keeps its selected option, it is cleared together with the value (reset, engine) */
    ngAfterViewInit(): void {
        this._valueSub = this.formControlRef.valueChanges.subscribe(value => {
            if (value === null || value === undefined || value === '') {
                this.list?.deselectAll();
            }
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._valueSub?.unsubscribe();
    }
}
