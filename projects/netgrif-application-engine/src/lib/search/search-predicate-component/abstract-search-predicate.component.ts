import {Inject, Input} from '@angular/core';
import {EditableElementaryPredicate} from '../models/predicate/editable-elementary-predicate';
import {Subject} from 'rxjs';
import {NAE_SEARCH_CATEGORIES} from '../category-factory/search-categories-injection-token';
import {Category} from '../models/category/category';


/**
 * Is responsible for the interactive creation of a single {@link ElementaryPredicate} object instance.
 */
export abstract class AbstractSearchPredicateComponent {

    @Input() predicate: EditableElementaryPredicate;
    @Input() predicateId: number;
    @Input() remove$: Subject<number>;

    protected _selectedCategory: Category<any>;

    protected constructor(@Inject(NAE_SEARCH_CATEGORIES) protected _searchCategories: Array<Category<any>>) {
    }

    public get searchCategories(): Array<Category<any>> {
        return this._searchCategories;
    }

    public remove(): void {
        this.remove$.next(this.predicateId);
    }

    public categoryChanged(newCategory: Category<any>): void {
        if (this._selectedCategory !== undefined) {
            this._selectedCategory.reset();
        }
        this._selectedCategory = newCategory;
    }
}
