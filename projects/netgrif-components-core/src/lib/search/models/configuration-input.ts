import {SearchInputType} from './category/search-input-type';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {SearchAutocompleteOption} from './category/search-autocomplete-option';
import {filter, map, startWith} from 'rxjs/operators';

/**
 * Represents a search category configuration input.
 *
 * Should handle all the logic related to autocomplete search configuration inputs.
 * If this class has its `type` set to `OPERATOR` it works mostly as a placeholder object, because the
 * operator and operand selection logic is handled by the {@link Category} class.
 * This behavior might be changed in future releases.
 */
export class ConfigurationInput {

    protected _formControl: FormControl<any>;

    protected _filteredOptions$: Observable<Array<SearchAutocompleteOption<unknown>>>;

    protected _textInputConfirmed = false;

    /**
     * @param type the type of the configuration input
     * @param label the translation path for the label of the input
     * @param displayBold whether the configuration input should be displayed in bold after selection or not
     * @param _autocompleteOptions the autocomplete options that are available in this configuration input
     * @param filterOptions a method that receives the keys of the available options and should return
     * the appropriately filtered autocomplete options
     */
    constructor(public type: SearchInputType.AUTOCOMPLETE | SearchInputType.OPERATOR | SearchInputType.PLAIN_QUERY | SearchInputType.TEXT,
                public label: string,
                public displayBold: boolean,
                protected _autocompleteOptions: Map<string, Array<unknown>>,
                filterOptions: (optionKeys: Array<string>, newValue: string) => Array<SearchAutocompleteOption<unknown>>) {
        this._formControl = new FormControl();

        this._filteredOptions$ = this._formControl.valueChanges.pipe(
            startWith(''),
            filter(newValue => typeof newValue === 'string' && this.type !== SearchInputType.TEXT),
            map(newValue => {
                return filterOptions(Array.from(this._autocompleteOptions.keys()), newValue);
            })
        );
    }

    public get formControl(): FormControl<any> {
        return this._formControl;
    }

    public get isOptionSelected(): boolean {
        if (this.type === SearchInputType.TEXT) {
            return this._textInputConfirmed && !!this._formControl.value;
        }
        return !!this._formControl.value && (typeof this._formControl.value !== 'string');
    }

    public get selectedOptionTranslatePath(): string {
        return this.isOptionSelected ? this._formControl.value.text : '';
    }

    public get filteredOptions$(): Observable<Array<SearchAutocompleteOption<unknown>>> {
        return this._filteredOptions$;
    }

    public confirmInput(): void {
        this._textInputConfirmed = true;
    }

    public editInput(editable: boolean): void {
        if (!editable) {
            return;
        }
        this._textInputConfirmed = false;
    }

    /**
     * Value changes of the encapsulated `FormControl` object
     */
    public valueChanges$(): Observable<any> {
        return this._formControl.valueChanges;
    }

    public clear(): void {
        this._formControl.setValue(undefined);
    }
}
