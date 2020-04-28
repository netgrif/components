import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Category} from '../models/category/category';
import {Observable} from 'rxjs';
import {CategoryFactoryService} from '../category-factory/category-factory.service';
import {CaseTitle} from '../models/category/case/case-title';
import {map, startWith} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {SelectLanguageService} from '../../toolbar/select-language.service';
import {SearchService} from '../search-service/search.service';
import {SimpleSearchChip} from '../models/chips/simple-search-chip';

@Component({
    selector: 'nae-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {

    /**
     * @ignore
     * FormControl for the user input field
     */
    public formControl = new FormControl();
    /**
     * @ignore
     * Array that holds all the available [Categories]{@link Category}
     */
    private readonly _searchCategories: Array<Category>;
    /**
     * @ignore
     * Observable that contains [Categories]{@link Category} that match user input. It updates it's content every time user input changes.
     */
    public filteredCategories: Observable<Array<Category>>;
    /**
     * @ignore
     * Array that holds constructed search chips.
     * If [_selectedCategory]{@link SearchComponent#_selectedCategory} has a value set,
     * then the last entry in the array is an incomplete chip.
     */
    public searchChips: Array<SimpleSearchChip> = [];
    /**
     * @ignore
     * Stores the state of the search GUI.
     * If some category is selected, then the next input completes it and adds a new Predicate to the search.
     * If not then the next input creates a fulltext search, or selects a new category.
     */
    private _selectedCategory: Category;
    /**
     * @ignore
     * Lambda that is used to preserve `this` reference in HTML binding.
     *
     * See [_renderSelection()]{@link SearchComponent#_renderSelection} for information about the function.
     * @param category the {@link Category} object that was selected in the autocomplete list.
     */
    public renderSelection = (category: Category) => this._renderSelection(category);

    constructor(private _categoryFactory: CategoryFactoryService,
                private _translate: TranslateService,
                private _searchService: SearchService,
                private _: SelectLanguageService) {
        // TODO customisable categories
        this._searchCategories = [this._categoryFactory.get(CaseTitle)];
        this.selectDefaultOperators();
        this.filteredCategories = this.formControl.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : this.categoryName(value)),
            map(categoryName => this._filterOptions(categoryName))
        );
    }

    /**
     * @ignore
     * filters available [Categories]{@link Category} based on user input
     * @param userInput string entered by the user
     * @returns [Categories]{@link Category} that start with the user input. Case insensitive. Based on locale translation.
     */
    private _filterOptions(userInput: string): Array<Category> {
        if (!this._selectedCategory) {
            const value = userInput.toLocaleLowerCase();
            return this._searchCategories.filter(category => this.categoryName(category).toLocaleLowerCase().startsWith(value));
        } else {
            return [];
        }
    }

    /**
     * @ignore
     * @param category Category, who's name we want to get
     * @returns the translated name of the provided {@link Category} object
     */
    private categoryName(category: Category): string {
        return this._translate.instant(category.translationPath) as string;
    }

    /**
     * @ignore
     * Transforms a {@link Category} object into it's name. Used for displaying user selection in the input field, when an autocomplete
     * option is selected.
     * @param category object we want to transform. It might not exist if user input doesn't match any autocomplete option
     * @returns translated category name if the {@link Category} exists, empty string otherwise
     */
    private _renderSelection(category: Category): string {
        return category ? this.categoryName(category) : '';
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
            }
        } else {
            if (inputValue === '') {
                return;
            }
            this._searchService.addPredicate(this._selectedCategory.generatePredicate([inputValue]));
            this.searchChips[this.searchChips.length - 1].text += inputValue;
            this._selectedCategory = undefined;
            this.formControl.setValue('');
        }
    }

    /**
     * @ignore
     * Removes a chip at the given index and affects the state of the input and filter accordingly.
     * @param index index of the chip that should be removed. No bounds checks are performed!
     */
    public removeChip(index: number): void {
        if (!!this._selectedCategory && index === this.searchChips.length - 1) {
            this._selectedCategory = undefined;
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
        this._searchCategories.forEach(category => {category.selectDefaultOperator()});
    }
}
