import {ConfigurationInput} from '../models/configuration-input';
import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Category} from '../models/category/category';
import {OperatorTemplatePart} from '../models/operator-template-part';
import {SearchAutocompleteOption} from '../models/category/search-autocomplete-option';
import {Observable} from 'rxjs';
import {AutocompleteOptions} from '../models/category/autocomplete-options';
import {MatSelect} from '@angular/material/select';

@Component({
    selector: 'ncc-abstract-search-configuration-input',
    template: ''
})
export abstract class AbstractSearchConfigurationInputComponent {

    /**
     * Whether the contents displayed in this component can be edited by the user or not.
     *
     * Defaults to `true`
     */
    @Input() editable = true;
    @Input() configuration: ConfigurationInput;
    @Input() selectedCategory: Category<any>;

    @ViewChild('configurationInput')
    public set configurationInput(input: MatSelect | ElementRef<HTMLInputElement>) {
        // TODO 20.1.2021 BUG - if multiple configuration inputs are displayed at the same time all of them will be focused.
        //  The same fix as in OperandInputs can be applied here as well.
        if (input) {
            setTimeout(() => {
                if ((input as any).nativeElement !== undefined) {
                    const ref = (input as ElementRef<HTMLInputElement>);
                    ref.nativeElement.focus();
                } else {
                    const select = (input as MatSelect);
                    select.focus();
                    select.open();
                }
            });
        }
    }

    public trackByTemplateParts = (a: number, b: OperatorTemplatePart) => this._trackByTemplateParts(a, b);

    /**
     * Lambda that is used to preserve `this` reference in HTML binding.
     *
     * See [_renderSelection()]{@link AbstractSearchPredicateComponent#_renderSelection} for information about the transform function.
     * @param option the {@link SearchAutocompleteOption} object that was selected in the autocomplete list.
     */
    public renderSelection = (option: SearchAutocompleteOption<unknown>) => this._renderSelection(option);

    public clearConfigurationInput(): void {
        if (!this.editable) {
            return;
        }

        this.configuration.clear();
    }

    public clearOperatorInput(): void {
        if (!this.editable) {
            return;
        }

        this.selectedCategory.clearOperatorSelection();
    }

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
