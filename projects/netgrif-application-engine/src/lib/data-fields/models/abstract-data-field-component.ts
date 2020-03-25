import {DataField} from './abstract-data-field';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {ChangedFields} from './changed-fields';
import {Input, OnInit} from '@angular/core';
import {filter, map} from 'rxjs/operators';

export abstract class AbstractDataFieldComponent implements OnInit {

    @Input() changedFields: Observable<ChangedFields>;
    @Input() dataField: DataField<any>;
    private readonly _formControl: FormControl;

    protected constructor() {
        this._formControl = new FormControl();
    }

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

    public get formControl(): FormControl {
        return this._formControl;
    }
}
