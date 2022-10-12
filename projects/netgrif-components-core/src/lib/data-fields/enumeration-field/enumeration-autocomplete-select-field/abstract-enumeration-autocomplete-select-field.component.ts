import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgModel} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {EnumerationField, EnumerationFieldValidation, EnumerationFieldValue} from '../models/enumeration-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TranslateService} from '@ngx-translate/core';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
    selector: 'ncc-abstract-enumeration-autocomplete-field',
    template: ''
})
export abstract class AbstractEnumerationAutocompleteSelectFieldComponent implements OnInit, OnDestroy {

    @Input() enumerationField: EnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;
    @ViewChild('input') text: NgModel;
    public tmpValue: string;

    filteredOptions: Observable<Array<EnumerationFieldValue>>;

    constructor(protected _translate: TranslateService) {
    }

    ngOnInit() {
        this.tmpValue = this.formControlRef.value ?? '';
        this.filteredOptions = this.formControlRef.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
        this.enumerationField.touch$.subscribe(touch => {
            if (touch) {
                this.text.control.markAsTouched();
            }
        });
        this.formControlRef.valueChanges.subscribe(it => {
            this.tmpValue = it ?? '';
        });
    }

    ngOnDestroy(): void {
        this.filteredOptions = undefined;
    }

    /**
     * Function to filter out matchless options without accent and case-sensitive differences
     * @param  value to compare matching options
     * @return  return matched options
     */
    private _filter(value: string): Array<EnumerationFieldValue> {
        const filterValue = value?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return this.enumerationField.choices.filter(option => option.value.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
    }

    change() {
        if (this.text.value !== undefined) {
            this.filteredOptions = of(this._filter(this.text.value));
        }
    }

    select(event: MatAutocompleteSelectedEvent) {
        this.formControlRef.setValue(event.option.value);
    }

    public renderSelection = (key) => {
        if (key !== undefined && key !== '' && key !== null) {
            if (this.enumerationField.choices.find(choice => choice.key === key)) {
                return this.enumerationField.choices.find(choice => choice.key === key).value;
            }
        }
        return key;
    }

    public buildErrorMessage() {
        if (this.formControlRef.hasError(EnumerationFieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        }
        if (this.formControlRef.hasError(EnumerationFieldValidation.WRONG_VALUE)) {
            return this._translate.instant('dataField.validations.enumeration');
        }
    }
}
