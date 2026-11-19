import {Component, Inject, Input, OnDestroy, Optional, ChangeDetectionStrategy} from "@angular/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {DataField} from "../models/abstract-data-field";
import {FormControl} from "@angular/forms";
import {ErrorStateMatcher} from '@angular/material/core';
import {WrappedBoolean} from "../data-field-template/models/wrapped-boolean";

@Component({
    selector: 'ncc-base-data-field',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractBaseDataFieldComponent<T extends DataField<unknown>> implements OnDestroy {

    @Input() public dataField: T;
    @Input() public formControlRef: FormControl;
    @Input() public showLargeLayout: WrappedBoolean;

    /**
     * Error state for a `matInput` that only displays the value and is not bound to `formControlRef`.
     */
    public readonly dataFieldErrorStateMatcher: ErrorStateMatcher = {
        isErrorState: () => !!this.dataField && this.dataField.isInvalid(this.formControlRef)
    };

    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<T>) {
        if (!!dataFieldPortalData) {
            this.dataField = dataFieldPortalData.dataField;
            this.formControlRef = dataFieldPortalData.formControlRef;
            this.showLargeLayout = dataFieldPortalData.showLargeLayout;
            if (!this.dataField.initialized) {
                this.formControlRef = new FormControl('', {updateOn: this.dataField.getUpdateOnStrategy()});
                this.dataField.registerFormControl(this.formControlRef)
            }
        }
    }

    ngOnDestroy(): void {
        this.dataField.disconnectFormControl();
    }

    public checkPropertyInComponent(property: string): boolean {
        return !!this.dataField?.component?.properties
            && property in this.dataField.component.properties;
    }

    public hasTitle(): boolean {
        return this.dataField.title !== undefined && this.dataField.title !== '';
    }

    public hasHint(): boolean {
        return this.dataField.description !== undefined && this.dataField.description !== '';
    }
}
