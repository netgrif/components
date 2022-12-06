import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {EnumerationField, EnumerationFieldValidation, EnumerationFieldValue} from '../models/enumeration-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TranslateService} from '@ngx-translate/core';
import {EnumerationAutocompleteFilterProperty} from "./enumeration-autocomplete-filter-property";

@Component({
    selector: 'ncc-abstract-enumeration-autocomplete-field',
    template: ''
})
export abstract class AbstractEnumerationAutocompleteSelectFieldComponent implements OnInit, OnDestroy {

    @Input() enumerationField: EnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;
    @ViewChild('input') text: ElementRef;

    filteredOptions: Observable<Array<EnumerationFieldValue>>;

    constructor(protected _translate: TranslateService) {
    }

    ngOnInit() {
        this.filteredOptions = this.formControlRef.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    ngOnDestroy(): void {
        this.filteredOptions = undefined;
    }

    protected checkPropertyInComponent(property: string): boolean {
        return !!this.enumerationField.component && !!this.enumerationField.component.properties && property in this.enumerationField.component.properties;
    }

    protected filterType(): string | undefined {
        if (this.checkPropertyInComponent('filter')) {
            return this.enumerationField.component.properties.filter;
        }
    }

    protected _filter(value: string): Array<EnumerationFieldValue> {
        let filterType = this.filterType()?.toLowerCase()
        switch (filterType) {
            case EnumerationAutocompleteFilterProperty.SUBSTRING:
                return this._filterInclude(value);
            case EnumerationAutocompleteFilterProperty.PREFIX:
                return this._filterIndexOf(value);
            default:
                return this._filterIndexOf(value);
        }
    }

    protected _filterInclude(value: string): Array<EnumerationFieldValue> {
        const filterValue = value?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return this.enumerationField.choices.filter(option =>
            option.value.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(filterValue));
    }


    /**
     * Function to filter out matchless options without accent and case-sensitive differences
     * @param  value to compare matching options
     * @return  return matched options
     */
    protected _filterIndexOf(value: string): Array<EnumerationFieldValue> {
        const filterValue = value?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return this.enumerationField.choices.filter(option => option.value.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
    }

    change() {
        if (this.text.nativeElement.value !== undefined) {
            this.filteredOptions = of(this._filter(this.text.nativeElement.value));
        }
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
