import {DataField} from './abstract-data-field';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {ChangedFields} from './changed-fields';
import {Input, OnInit} from '@angular/core';
import {filter, map} from 'rxjs/operators';

/**
 * Holds the common functionality for all DataFieldComponents.
 */
export abstract class AbstractDataFieldComponent implements OnInit {

    // TODO BUG 16.4.2020 - changedFields are not used for their intended purpose. Consider removing it altogether.
    @Input() changedFields: Observable<ChangedFields>;
    /**
     * The Model object that this Component should render.
     * It should be overridden in each class that extends this one, to provide a more specific type.
     */
    @Input() dataField: DataField<any>;
    @Input() taskOffset = 0;
    /**
     * @ignore
     * See [formControl]{@link AbstractDataFieldComponent#formControl}
     */
    protected _formControl: FormControl;

    protected constructor() {
        this._formControl = new FormControl('', { updateOn: 'blur' });
    }

    /**
     * Registers the {@link FormControl} to the provided data field.
     *
     * See [DataField.registerFormControl]{@link DataField#registerFormControl} form more information.
     */
    ngOnInit(): void {
        this.dataField.registerFormControl(this._formControl);

        if (this.changedFields !== undefined) {
            this.changedFields.pipe(
                filter(fields => this.dataField.stringId in fields),
                map(fields => fields[this.dataField.stringId])
            ).subscribe(change => {
                this.dataField.applyChange(change);
                this.dataField.updateFormControlState(this._formControl);
            });
        }
    }

    /**
     * The [FormControl]{@link https://angular.io/api/forms/FormControl} object that should be used to control any rendered forms.
     */
    public get formControl(): FormControl {
        return this._formControl;
    }
}
