import {Component, ElementRef, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {EnumerationField, EnumerationFieldValidation, EnumerationFieldValue} from '../models/enumeration-field';
import {TranslateService} from '@ngx-translate/core';
import {EnumerationAutocompleteFilterProperty} from "./enumeration-autocomplete-filter-property";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-enumeration-autocomplete-field',
    template: ''
})
export abstract class AbstractEnumerationAutocompleteSelectFieldComponent extends AbstractBaseDataFieldComponent<EnumerationField> implements OnInit, OnDestroy {

    @ViewChild('input') text: ElementRef;
    filteredOptions: Observable<Array<EnumerationFieldValue>>;

    constructor(_translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(_translate, dataFieldPortalData);
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
        return !!this.dataField.component && !!this.dataField.component.properties && property in this.dataField.component.properties;
    }

    protected filterType(): string | undefined {
        if (this.checkPropertyInComponent('filter')) {
            return this.dataField.component.properties.filter;
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
        return this.dataField.choices.filter(option =>
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

        return this.dataField.choices.filter(option => option.value.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
    }

    change() {
        if (this.text.nativeElement.value !== undefined) {
            this.filteredOptions = of(this._filter(this.text.nativeElement.value));
        }
    }

    public renderSelection = (key) => {
        if (key !== undefined && key !== '' && key !== null) {
            if (this.dataField.choices.find(choice => choice.key === key)) {
                return this.dataField.choices.find(choice => choice.key === key).value;
            }
        }
        return key;
    }

    public buildErrorMessage() {
        if (this.formControlRef.hasError(EnumerationFieldValidation.REQUIRED)) {
            return this.translate.instant('dataField.validations.required');
        }
        if (this.formControlRef.hasError(EnumerationFieldValidation.WRONG_VALUE)) {
            return this.translate.instant('dataField.validations.enumeration');
        }
    }
}
