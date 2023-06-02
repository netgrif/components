import {Component, ElementRef, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {MultichoiceField, MultichoiceFieldValue} from '../models/multichoice-field';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, of, Subscription} from 'rxjs';
import {MultichoiceAutocompleteFilterProperty} from './multichoice-autocomplete-filter-property';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-multichoice-autocomplete-field',
    template: ''
})
export abstract class AbstractMultichoiceAutocompleteFieldComponentComponent extends AbstractBaseDataFieldComponent<MultichoiceField> implements OnInit, OnDestroy {

    @ViewChild('input') input: ElementRef;

    separatorKeysCodes: number[] = [ENTER, COMMA];

    subscriptionChangeData$: Subscription;

    filteredOptions: Observable<Array<MultichoiceFieldValue>>;

    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(undefined, dataFieldPortalData);
    }

    ngOnInit() {
        this.subscriptionChangeData$ = this.formControlRef.valueChanges.subscribe(newVal => {
            this.filteredOptions = of(this._filter(newVal ?? '').filter((option) => !this.dataField.value?.includes(option.key)));
        })
    }

    ngOnDestroy(): void {
        this.filteredOptions = undefined;
        this.subscriptionChangeData$.unsubscribe();
    }

    add(event: MatChipInputEvent): void {
        const value = event['key'] ?? '';

        if (value) {
            this.dataField.value = this.dataField.value === null ? [] : this.dataField.value
            const choiceArray = [...this.dataField.value];
            choiceArray.push(value);
            this.dataField.value = choiceArray;
            this.input.nativeElement.value = '';
            this.change();
        } else {
            this.input.nativeElement.value = '';
            this.change();
        }
    }

    remove(value: string): void {
        const index = this.dataField.value.indexOf(value);

        if (index >= 0) {
            const choiceArray = [...this.dataField.value];
            choiceArray.splice(index, 1);
            this.dataField.value = choiceArray;
            this.change();
        }
    }

    change() {
        if (this.input.nativeElement.value !== undefined) {
            this.filteredOptions = of(this._filter(this.input.nativeElement.value).filter((option) => !this.dataField.value.includes(option.key)));
        }
    }

    protected checkPropertyInComponent(property: string): boolean {
        return !!this.dataField.component && !!this.dataField.component.properties && property in this.dataField.component.properties;
    }

    protected filterType(): string | undefined {
        if (this.checkPropertyInComponent('filter')) {
            return this.dataField.component.properties.filter;
        }
    }

    protected _filter(value: string): Array<MultichoiceFieldValue> {
        let filterType = this.filterType()?.toLowerCase()
        switch (filterType) {
            case MultichoiceAutocompleteFilterProperty.SUBSTRING:
                return this._filterInclude(value);
            case MultichoiceAutocompleteFilterProperty.PREFIX:
                return this._filterIndexOf(value);
            default:
                return this._filterIndexOf(value);
        }
    }

    protected _filterInclude(value: string): Array<MultichoiceFieldValue> {
        if (Array.isArray(value)) {
            value = '';
        }
        const filterValue = value?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return this.dataField.choices.filter(option => option.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filterValue));
    }

    protected _filterIndexOf(value: string): Array<MultichoiceFieldValue> {
        if (Array.isArray(value)) {
            value = '';
        }
        const filterValue = value?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return this.dataField.choices.filter(option => option.value.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
    }

    public renderSelection = (key) => {
        if (key !== undefined && key !== '' && key !== null) {
            if (this.dataField.choices.find(choice => choice.key === key)) {
                return this.dataField.choices.find(choice => choice.key === key).value;
            }
        }
        return key;
    }

    public getValueFromKey(key: string): string | undefined {
        return this.dataField.choices.find(choice => choice.key === key)?.value;
    }
}
