import {ConfigurationInput} from '../models/configuration-input';
import {Input} from '@angular/core';
import {Category} from '../models/category/category';
import {OperatorTemplatePart} from '../models/operator-template-part';
import {SearchAutocompleteOption} from '../models/category/search-autocomplete-option';
import {Observable} from 'rxjs';
import {AutocompleteOptions} from 'netgrif-application-engine';

export abstract class AbstractSearchConfigurationInputComponent {

    @Input() configuration: ConfigurationInput;
    @Input() selectedCategory: Category<any>;

    public trackByTemplateParts = (a: number, b: OperatorTemplatePart) => this._trackByTemplateParts(a, b);

    /**
     * Lambda that is used to preserve `this` reference in HTML binding.
     *
     * See [_renderSelection()]{@link AbstractSearchPredicateComponent#_renderSelection} for information about the transform function.
     * @param option the {@link SearchAutocompleteOption} object that was selected in the autocomplete list.
     */
    public renderSelection = (option: SearchAutocompleteOption<unknown>) => this._renderSelection(option);

    public filterOptions: (userInput: Observable<string>) => Observable<Array<SearchAutocompleteOption<unknown>>> = userInput => {
        return (this.selectedCategory as (Category<any> & AutocompleteOptions)).filterOptions(userInput);
    }

    /**
     * Function for tracking Template parts in ngFor.
     * @param index index of the ngFor element
     * @param item template part
     */
    protected _trackByTemplateParts(index: number, item: OperatorTemplatePart): any {
        return item.id;
    }

    /**
     * Transforms a {@link SearchAutocompleteOption} object into it's name.
     * Used for displaying user selection in the input field, when an autocomplete option is selected.
     * @param option the object we want to transform. It might not exist if user input doesn't match any autocomplete option
     * @returns option name if it exists, empty string otherwise
     */
    protected _renderSelection(option: SearchAutocompleteOption<unknown>): string {
        return option ? option.text : '';
    }
}
