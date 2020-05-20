import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {EnumerationField} from '../models/enumeration-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

@Component({
    selector: 'nae-enumeration-autocomplete-select-field',
    templateUrl: './enumeration-autocomplete-select-field.component.html',
    styleUrls: ['./enumeration-autocomplete-select-field.component.scss']
})
export class EnumerationAutocompleteSelectFieldComponent implements OnInit {

    @Input() enumerationField: EnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    options: string[];
    filteredOptions: Observable<string[]>;

    ngOnInit() {
        this.options = this.enumerationField.choices.map(value => value['value']);
        this.filteredOptions = this.formControlRef.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    /**
     * Function to filter out matchless options without accent and case-sensitive differences
     * @param  value to compare matching options
     * @return  return matched options
     */
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return this.enumerationField.choices.map(choice => choice.value).filter(option => option.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
    }

    public renderSelection = (key) => {
        return this.enumerationField.choices.find(choice => choice.key === key).value;
    }
}
