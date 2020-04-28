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
    private readonly _options: Array<Category>;
    /**
     * @ignore
     * Observable that contains [Categories]{@link Category} that match user input. It updates it's content every time user input changes.
     */
    public filteredOptions: Observable<Array<Category>>;

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
        this._options = [this._categoryFactory.get(CaseTitle)];
        this.filteredOptions = this.formControl.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : this.categoryName(value)),
            map(categoryName => categoryName ? this._filterOptions(categoryName) : this._options.slice())
        );
    }

    /**
     * @ignore
     * filters available [Categories]{@link Category} based on user input
     * @param userInput string entered by the user
     * @returns [Categories]{@link Category} that start with the user input. Case insensitive. Based on locale translation.
     */
    private _filterOptions(userInput: string): Array<Category> {
        const value = userInput.toLocaleLowerCase();
        return this._options.filter(category => this.categoryName(category).toLocaleLowerCase().startsWith(value));
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
        if (!this._selectedCategory) {
            const inputValue = this.formControl.value;
            if ( !(inputValue instanceof Category)) {
                // full text search
                if (inputValue === '') {
                    this._searchService.removeFullTextFilter();
                } else {
                    this._searchService.addFullTextFilter(inputValue);
                }
            }
        }
    }
}
