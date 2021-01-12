import {Inject, Input} from '@angular/core';
import {EditableElementaryPredicate} from '../models/predicate/editable-elementary-predicate';
import {Subject} from 'rxjs';
import {NAE_SEARCH_CATEGORIES} from '../category-factory/search-categories-injection-token';
import {Category} from '../models/category/category';
import {SearchAutocompleteOption} from '../models/category/search-autocomplete-option';
import {OperatorTemplatePart} from '../models/operator-template-part';


/**
 * Is responsible for the interactive creation of a single {@link ElementaryPredicate} object instance.
 */
export abstract class AbstractSearchPredicateComponent {

    @Input() predicate: EditableElementaryPredicate;
    @Input() predicateId: number;
    @Input() remove$: Subject<number>;

    public selectedCategory: Category<any>;

    protected constructor(@Inject(NAE_SEARCH_CATEGORIES) protected _searchCategories: Array<Category<any>>) {
    }

    public get searchCategories(): Array<Category<any>> {
        return this._searchCategories;
    }

    public remove(): void {
        this.remove$.next(this.predicateId);
    }

    public categoryChanged(newCategory: Category<any>): void {
        if (this.selectedCategory !== undefined) {
            this.selectedCategory.reset();
        }
        this.selectedCategory = newCategory;
    }

    public trackByTemplateParts = (a: number, b: OperatorTemplatePart) => this._trackByTemplateParts(a, b);

    /**
     * Lambda that is used to preserve `this` reference in HTML binding.
     *
     * See [_renderSelection()]{@link AbstractSearchPredicateComponent#_renderSelection} for information about the transform function.
     * @param option the {@link SearchAutocompleteOption} object that was selected in the autocomplete list.
     */
    public renderSelection = (option: SearchAutocompleteOption) => this._renderSelection(option);

    /**
     * Transforms a {@link SearchAutocompleteOption} object into it's name.
     * Used for displaying user selection in the input field, when an autocomplete option is selected.
     * @param option the object we want to transform. It might not exist if user input doesn't match any autocomplete option
     * @returns option name if it exists, empty string otherwise
     */
    protected _renderSelection(option: SearchAutocompleteOption): string {
        return option ? option.text : '';
    }

    /**
     * Function for tracking Template parts in ngFor.
     * @param index index of the ngFor element
     * @param item template part
     */
    protected _trackByTemplateParts(index: number, item: OperatorTemplatePart): any {
        return item.id;
    }
}
