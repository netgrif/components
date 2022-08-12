import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MultichoiceField, MultichoiceFieldValue} from '../models/multichoice-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'ncc-abstract-multichoice-autocomplete-field',
  template: ''
})
export abstract class AbstractMultichoiceAutocompleteFieldComponentComponent implements OnInit, OnDestroy {

    @Input() multichoiceField: MultichoiceField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;
    @ViewChild('input') input: ElementRef;

    separatorKeysCodes: number[] = [ENTER, COMMA];

    filteredOptions: Observable<Array<MultichoiceFieldValue>>;

    ngOnInit() {
        this.filteredOptions = this.formControlRef.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    ngOnDestroy(): void {
        this.filteredOptions = undefined;
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            this.multichoiceField.value.push(value);
        }

        event.chipInput!.clear();
        this.formControlRef.setValue(null);

    }

    remove(value: string): void {
        const index = this.multichoiceField.value.indexOf(value);

        if (index >= 0) {
            this.multichoiceField.value.splice(index, 1);
        }
    }

    change() {
        if (this.input.nativeElement.value !== undefined) {
            this.filteredOptions = of(this._filter(this.input.nativeElement.value));
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.multichoiceField.value.push(event.option.viewValue);
        this.formControlRef.setValue(null);
    }

    /**
     * Function to filter out matchless options without accent and case-sensitive differences
     * @param  value to compare matching options
     * @return  return matched options
     */
    private _filter(value: string): Array<MultichoiceFieldValue> {
        if(Array.isArray(value)){
            value = '';
        }
        const filterValue = value?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return this.multichoiceField.choices.filter(option => option.value.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
    }

    public renderSelection = (key) => {
        if (key !== undefined && key !== '' && key !== null) {
            if (this.multichoiceField.choices.find(choice => choice.key === key)) {
                return this.multichoiceField.choices.find(choice => choice.key === key).value;
            }
        }
        return key;
    }
}
