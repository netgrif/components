import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Category} from '../models/category/category';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {SelectLanguageService} from '../../toolbar/select-language.service';
import {SearchService} from '../search-service/search.service';
import {SimpleSearchChip} from '../models/chips/simple-search-chip';
import {SearchAutocompleteOption} from '../models/category/search-autocomplete-option';
import {AutocompleteCategory} from '../models/category/autocomplete-category';
import {SearchInputType} from '../models/category/search-input-type';

/**
 * Provides the basic functionality of a search GUI. Allows fulltext searching and simple category searching.
 * Categories must be provided externally.
 */
@Component({
    selector: 'nae-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    /**
     * @ignore
     * Stores the state of the search GUI.
     * If some category is selected, then the next input completes it and adds a new Predicate to the search.
     * If not then the next input creates a fulltext search, or selects a new category.
     */
    private _selectedCategory: Category<any>;
    /**
     * @ignore
     * Stores what input is currently being shown to the user
     */
    private _shownInput$: BehaviorSubject<string> = new BehaviorSubject<string>('text');

    /**
     * Array that holds all the available [Categories]{@link Category}
     */
    @Input() public searchCategories: Array<Category<any>>;
    /**
     * @ignore
     * FormControl for the user input field
     */
    public formControls = {
        text: new FormControl(),
        date: new FormControl(),
    };
    /**
     * @ignore
     * Observable that contains [Categories]{@link Category} that match user input. It updates it's content every time user input changes.
     */
    public filteredOptions: Observable<Array<Category<any>> | Array<SearchAutocompleteOption>>;
    /**
     * @ignore
     * Array that holds constructed search chips.
     * If [_selectedCategory]{@link SearchComponent#_selectedCategory} has a value set,
     * then the last entry in the array is an incomplete chip.
     */
    public searchChips: Array<SimpleSearchChip> = [];
    /**
     * @ignore
     * exists so that we can access Enum in HTML
     */
    public searchInputType = SearchInputType;
    /**
     * @ignore
     * Lambda that is used to preserve `this` reference in HTML binding.
     *
     * See [_renderSelection()]{@link SearchComponent#_renderSelection} for information about the function.
     * @param object the {@link Category} or {@link SearchAutocompleteOption} object that was selected in the autocomplete list.
     */
    public renderSelection = (object: Category<any> | SearchAutocompleteOption) => this._renderSelection(object);

    constructor(private _translate: TranslateService,
                private _searchService: SearchService,
                private _: SelectLanguageService) {
        this.filteredOptions = this.formControl.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : this.objectName(value)),
            map(inputText => this._filterOptions(inputText))
        );
    }

    /**
     * @ignore
     * Selects the default operators on the provided categories
     */
    public ngOnInit(): void {
        this.selectDefaultOperators();
    }

    public get shownInput$(): Observable<string> {
        return this._shownInput$.asObservable();
    }

    public get shownInput(): string {
        return this._shownInput$.getValue();
    }

    /**
     * @ignore
     * filters available [Categories]{@link Category} based on user input
     * @param userInput string entered by the user
     * @returns [Categories]{@link Category} that start with the user input. Case insensitive. Based on locale translation.
     */
    private _filterOptions(userInput: string): Array<Category<any>> | Array<SearchAutocompleteOption> {
        if (!this._selectedCategory) {
            const value = userInput.toLocaleLowerCase();
            return this.searchCategories.filter(category => this.categoryName(category).toLocaleLowerCase().startsWith(value));
        } else {
            if (this._selectedCategory instanceof AutocompleteCategory) {
                return this._selectedCategory.filterOptions(userInput);
            }
            return [];
        }
    }

    /**
     * @ignore
     * @param object autocomplete object who's name we want to get
     * @returns the name of the provided object
     */
    private objectName(object: Category<any> | SearchAutocompleteOption): string {
        if (object instanceof Category) {
            return this.categoryName(object);
        } else {
            return object.text;
        }
    }

    /**
     * @ignore
     * @param category Category, who's name we want to get
     * @returns the translated name of the provided {@link Category} object
     */
    private categoryName(category: Category<any>): string {
        return this._translate.instant(category.translationPath) as string;
    }

    /**
     * @ignore
     * Transforms a {@link Category} or {@link SearchAutocompleteOption} object into it's name.
     * Used for displaying user selection in the input field, when an autocomplete option is selected.
     * @param object the object we want to transform. It might not exist if user input doesn't match any autocomplete option
     * @returns translated category name if the {@link Category} exists, empty string otherwise
     */
    private _renderSelection(object: Category<any> | SearchAutocompleteOption): string {
        return object ? this.objectName(object) : '';
    }

    /**
     * @ignore
     * This function is called when the user confirms their's input.
     * The Search GUI must move to it's next state based on it's current state.
     */
    public confirmUserInput(): void {
        const inputValue = this.formControl.value;
        if (!this._selectedCategory) {
            if (!(inputValue instanceof Category)) {
                // full text search
                if (inputValue === '') {
                    this._searchService.removeFullTextFilter();
                } else {
                    this._searchService.addFullTextFilter(inputValue);
                }
            } else {
                // start new chip
                this._selectedCategory = inputValue;
                this.searchChips.push({text: `${this.categoryName(inputValue)}: `});
                this.formControl.setValue('');
                this.updateInputType();
            }
        } else {
            if (inputValue === '') {
                return;
            }
            if (this._selectedCategory.inputType === SearchInputType.AUTOCOMPLETE) {
                this._searchService.addPredicate(this._selectedCategory.generatePredicate(inputValue.value));
                this.appendTextToLastChip(inputValue.text);
            } else {
                this._searchService.addPredicate(this._selectedCategory.generatePredicate([inputValue]));
                this.appendTextToLastChip(inputValue);
            }
            this._selectedCategory = undefined;
            this.formControl.setValue('');
        }
    }

    /**
     * @ignore
     * Appends the provided text to the text of the last chip
     * @param text text that should be appended
     */
    private appendTextToLastChip(text: string): void {
        this.searchChips[this.searchChips.length - 1].text += text;
    }

    /**
     * @ignore
     * Removes a chip at the given index and affects the state of the input and filter accordingly.
     * @param index index of the chip that should be removed. No bounds checks are performed!
     */
    public removeChip(index: number): void {
        if (!!this._selectedCategory && index === this.searchChips.length - 1) {
            this._selectedCategory = undefined;
            this.updateInputType();
        } else {
            this._searchService.removePredicate(index);
        }
        this.searchChips.splice(index, 1);
    }

    /**
     * @ignore
     * Iterates over all Categories and selects their default Operator.
     */
    private selectDefaultOperators(): void {
        this.searchCategories.forEach(category => {
            category.selectDefaultOperator();
        });
    }

    /**
     * @ignore
     * Determines which input should be displayed and updates the value in [_shownInput$]{@link SearchComponent#_shownInput$}.
     */
    public updateInputType(): void {
        if (!this._selectedCategory) {
            this._shownInput$.next('text');
            return;
        }
        switch (this._selectedCategory.inputType) {
            case SearchInputType.DATE:
                this._shownInput$.next('date');
                return;
            default:
                this._shownInput$.next('text');
                return;
        }
    }

    /**
     * @ignore
     * @returns the FormControl instance that corresponds to the input currently shown to the user.
     */
    private get formControl(): FormControl {
        return this.formControls[this.shownInput];
    }
}
