import {Component, ElementRef, Inject, OnDestroy, OnInit, Optional, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {EnumerationField, EnumerationFieldValidation, EnumerationFieldValue} from '../models/enumeration-field';
import {TranslateService} from '@ngx-translate/core';
import {EnumerationAutocompleteFilterProperty} from "./enumeration-autocomplete-filter-property";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-enumeration-autocomplete-field',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractEnumerationAutocompleteSelectFieldComponent extends AbstractBaseDataFieldComponent<EnumerationField> implements OnInit, OnDestroy {

    @ViewChild('input') text: ElementRef;
    filteredOptions: Observable<Array<EnumerationFieldValue>>;

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(dataFieldPortalData);
    }

    ngOnInit() {
        this.filteredOptions = this.formControlRef.valueChanges.pipe(
            startWith(''),
            map(value => this.optionsFor(this.isChosenOption(value) ? this.renderSelection(value) : value))
        );
    }

    ngOnDestroy(): void {
        this.filteredOptions = undefined;
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
            this.filteredOptions = of(this.optionsFor(this.text.nativeElement.value));
        }
    }

    /**
     * Options offered for the text of the input: all of them while the text is the selected option (the panel opened on
     * a chosen value offers the other options too), otherwise the options matching the typed text.
     */
    protected optionsFor(text: string): Array<EnumerationFieldValue> {
        if (typeof text === 'string' && this.isSelectedKey(this.formControlRef.value)
                && text === this.renderSelection(this.formControlRef.value)) {
            return this.dataField.choices;
        }
        return this._filter(text);
    }

    /**
     * The value is an option chosen in the panel, not a typed text that equals the key of an option: the input shows the
     * label of the chosen option (written before the value is set).
     */
    protected isChosenOption(value: unknown): boolean {
        return this.isSelectedKey(value) && (!this.text?.nativeElement || this.text.nativeElement.value === this.renderSelection(value));
    }

    /** the value is the key of one of the options */
    protected isSelectedKey(value: unknown): boolean {
        return value !== undefined && value !== null && value !== ''
            && this.dataField.choices.some(choice => choice.key === value);
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
            return this._translate.instant('dataField.validations.required');
        }
        if (this.formControlRef.hasError(EnumerationFieldValidation.WRONG_VALUE)) {
            return this._translate.instant('dataField.validations.enumeration');
        }
    }
}
