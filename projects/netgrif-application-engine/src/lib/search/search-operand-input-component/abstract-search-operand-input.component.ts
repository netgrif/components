import {Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SearchInputType} from '../models/category/search-input-type';
import {Observable} from 'rxjs';
import {SearchAutocompleteOption} from '../models/category/search-autocomplete-option';
import {debounceTime} from 'rxjs/operators';


export class AbstractSearchOperandInputComponent {

    @Input() inputFormControl: FormControl;
    @Input() inputType: SearchInputType;
    /**
     * Only if the input is of type [AUTOCOMPLETE{@link SearchInputType#AUTOCOMPLETE}
     */
    @Input() filterOptionsFunction: (userInput: Observable<string>) => Observable<Array<SearchAutocompleteOption>>;

    public renderSelection = (selection: SearchAutocompleteOption) => this._renderSelection(selection);

    public get filteredOptions(): Observable<Array<SearchAutocompleteOption>> {
        return this.filterOptionsFunction(this.inputFormControl.valueChanges.pipe(debounceTime(300)));
    }

    /**
     * Autocomplete `displayWith` function
     * @param selection the selected option
     */
    protected _renderSelection(selection: SearchAutocompleteOption): string {
        return selection.text;
    }
}
