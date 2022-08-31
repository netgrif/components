import {Component, Inject, Input, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {NAE_SEARCH_CATEGORIES} from '../category-factory/search-categories-injection-token';
import {Category} from '../models/category/category';
import {SearchAutocompleteOption} from '../models/category/search-autocomplete-option';
import {ElementaryPredicate} from '../models/predicate/elementary-predicate';
import {Query} from '../models/query/query';
import {LoggerService} from '../../logger/services/logger.service';
import {MatSelect} from '@angular/material/select';
import {EditableElementaryPredicate} from '../models/predicate/editable-elementary-predicate';
import {
    AdvancedSearchComponentInitializationService
} from '../advanced-search-component-initialization-service/advanced-search-component-initialization.service';
import {CategoryFactory} from '../category-factory/category-factory';


/**
 * Is responsible for the interactive creation of a single {@link ElementaryPredicate} object instance.
 */
@Component({
    selector: 'ncc-abstract-search-predicate',
    template: ''
})
export abstract class AbstractSearchPredicateComponent implements OnInit, OnDestroy {

    /**
     * Whether the contents displayed in this component can be edited by the user or not.
     *
     * Defaults to `true`
     */
    @Input() editable = true;
    @Input() predicate: EditableElementaryPredicate;
    @Input() predicateId: number;
    @Input() remove$: Subject<number>;
    /**
     * Optional generator with prefilled values. Can be used to add prefilled predicate components to the search GUI.
     */
    @Input() generator: Category<any> | undefined;

    protected _selectedCategory: Category<any>;

    protected _predicateChange: Subscription;

    protected _searchCategories: Array<Category<any>>;

    protected constructor(@Inject(NAE_SEARCH_CATEGORIES) private _naeSearchCategories: Array<Type<Category<any>>>,
                          protected _logger: LoggerService,
                          protected _initializationService: AdvancedSearchComponentInitializationService,
                          protected _categoryFactory: CategoryFactory) {
    }

    ngOnInit() {
        let found = false;
        this._searchCategories = this._naeSearchCategories.map(category => {
            // if the provided generator is the same class as one of the injected search categories
            if (this.generator && this.generator.constructor === category) {
                found = true;
                this.categoryChanged(this.generator);
                return this.generator;
            }
            return this._categoryFactory.get(category);
        });

        if (this.generator && !found) {
            this._logger.error('Provided predicate generator is not an allowed category from the NAE_SEARCH_CATEGORIES injection token!'
                + ' Behavior in this case is undefined.');
        }

        this.predicate.setMetadataGenerator(() => {
            if (!!this._selectedCategory) {
                return this._selectedCategory.createMetadata();
            }
            return undefined;
        });

        this.predicate.setFilterTextSegmentsGenerator(() => {
            if (!!this._selectedCategory) {
                return this._selectedCategory.createFilterTextSegments();
            }
            return [];
        });
    }

    ngOnDestroy(): void {
        if (this._predicateChange && !this._predicateChange.closed) {
            this._predicateChange.unsubscribe();
        }
        this._searchCategories.forEach(cat => {
            if (cat !== this.generator) {
                cat.destroy();
            }
        });
    }

    public get searchCategories(): Array<Category<any>> {
        return this._searchCategories;
    }

    @ViewChild('categoryInput')
    public set categoryInput(input: MatSelect) {
        if (input && this._initializationService.isInitialized) {
            setTimeout(() => {
                input.focus();
                input.open();
            });
        }
    }

    public get selectedCategory(): Category<any> {
        return this._selectedCategory;
    }

    public set selectedCategory(newCategory: Category<any>) {
        this.categoryChanged(newCategory);
    }

    /**
     * Lambda that is used to preserve `this` reference in HTML binding.
     *
     * See [_renderSelection()]{@link AbstractSearchPredicateComponent#_renderSelection} for information about the transform function.
     * @param option the {@link SearchAutocompleteOption} object that was selected in the autocomplete list.
     */
    public renderSelection = (option: SearchAutocompleteOption<unknown>) => this._renderSelection(option);

    public remove(): void {
        this.remove$.next(this.predicateId);
    }

    public categoryChanged(newCategory: Category<any>): void {
        if (this.selectedCategory !== undefined) {
            this.selectedCategory.reset();
        }
        this._selectedCategory = newCategory;
        if (newCategory !== undefined) {
            if (this._predicateChange) {
                this._predicateChange.unsubscribe();
            }
            this._predicateChange = newCategory.generatedPredicate$.subscribe(predicate => this.processPredicateChange(predicate));
        }
    }

    public clearCategorySelection(): void {
        if (!this.editable) {
            return;
        }

        this.categoryChanged(undefined);
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

    /**
     * Notifies the `EditableElementaryPredicate` about changes to the predicate generated by the selected `Category`.
     * @param newPredicate predicate generated by the selected `Category`
     */
    protected processPredicateChange(newPredicate: ElementaryPredicate | undefined): void {
        if (newPredicate === undefined) {
            this.predicate.query = Query.emptyQuery();
            this._logger.debug('Editable query changed to empty query');
        } else {
            this.predicate.query = newPredicate.query;
            this._logger.debug(`Editable query changed to: ${newPredicate.query.value}`);
        }
    }
}
