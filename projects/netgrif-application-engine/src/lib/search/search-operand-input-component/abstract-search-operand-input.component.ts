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
    @Input() filterOptionsFunction: (userInput: Observable<string>) => Observable<Array<SearchAutocompleteOption<unknown>>>;

    private _filteredOptions$: Observable<Array<SearchAutocompleteOption<unknown>>>;

    public renderSelection = (selection: SearchAutocompleteOption<unknown>) => this._renderSelection(selection);

    public get filteredOptions$(): Observable<Array<SearchAutocompleteOption<unknown>>> {
        if (!this._filteredOptions$) {
            this._filteredOptions$ = this.filterOptionsFunction(this.inputFormControl.valueChanges.pipe(debounceTime(600)));
        }
        return this._filteredOptions$;
    }

    /**
     * Autocomplete `displayWith` function
     * @param selection the selected option
     */
    protected _renderSelection(selection: SearchAutocompleteOption<unknown>): string {
        return selection ? selection.text : '';
    }
}
