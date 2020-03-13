import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {EnumerationField} from '../enumeration-field';
import {WrappedBoolean} from '../../data-field-template/wrapped-boolean';

@Component({
    selector: 'nae-enumeration-autocomplete-select-field',
    templateUrl: './enumeration-autocomplete-select-field.component.html',
    styleUrls: ['./enumeration-autocomplete-select-field.component.scss']
})
export class EnumerationAutocompleteSelectFieldComponent implements OnInit {

    @Input() enumerationField: EnumerationField;
    @Input() showLargeLayout: WrappedBoolean;

    validate = new FormControl();
    selected: string;
    options: string[];
    filteredOptions: Observable<string[]>;

    ngOnInit() {
        this.selected = this.enumerationField.value.key;
        this.options = this.enumerationField.choices.map(value => value['value']);
        this.filteredOptions = this.validate.valueChanges.pipe(
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

        return this.options.filter(option => option.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
    }

}
