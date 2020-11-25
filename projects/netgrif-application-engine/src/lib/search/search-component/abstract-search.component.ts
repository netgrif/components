import {ElementRef, Input, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Category} from '../models/category/category';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, mergeAll, startWith} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {SearchService} from '../search-service/search.service';
import {SimpleSearchChip} from '../models/chips/simple-search-chip';
import {SearchAutocompleteOption} from '../models/category/search-autocomplete-option';
import {AutocompleteCategory} from '../models/category/autocomplete-category';
import {SearchInputType} from '../models/category/search-input-type';
import {DATE_FORMAT_STRING, DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {Moment} from 'moment';
import {CaseDataset} from '../models/category/case/case-dataset';
import {SearchChipService} from '../search-chip-service/search-chip.service';
import {ChipRequest} from '../models/chips/chip-request';
import {LoggerService} from '../../logger/services/logger.service';

/**
 * Provides the basic functionality of a search GUI. Allows fulltext searching and simple category searching.
 * Categories must be provided externally.
 */

export abstract class AbstractSearchComponent implements OnInit, OnDestroy {

    /**
     * @ignore
     * Stores the state of the search GUI.
     * If some category is selected, then the next input completes it and adds a new Predicate to the search.
     * If not then the next input creates a fulltext search, or selects a new category.
     */
    protected _selectedCategory: Category<any>;
    /**
     * @ignore
     * Stores what input is currently being shown to the user
     */
    protected _shownInput$: BehaviorSubject<string> = new BehaviorSubject<string>('text');
    /**
     * @ignore
     * Contains the i18n paths for currently displayed placeholder
     */
    protected _inputPlaceholder$: BehaviorSubject<string> = new BehaviorSubject<string>('search.placeholder.text');

    /**
     * Array that holds all the available [Categories]{@link Category}
     */
    @Input() public searchCategories: Array<Category<any>>;
    /**
     * @ignore
     * FormControls for the user input fields. One for each input type.
     */
    public formControls = {
        text: new FormControl(),
        date: new FormControl(),
        dateTime: new FormControl(),
        number: new FormControl(),
        boolean: new FormControl(false),
    };
    /**
     * @ignore
     * Used to clear the value of the text input as there is a bug in angular
     */
    @ViewChild('autocompleteInput') textInputRef: ElementRef<HTMLInputElement>;
    /**
     * @ignore
     * Observable that contains [Categories]{@link Category} that match user input. It updates it's content every time user input changes.
     */
    public filteredOptions: Observable<Array<Category<any>> | Array<SearchAutocompleteOption>>;
    /**
     * @ignore
     * Array that holds constructed search chips.
     * If [_selectedCategory]{@link AbstractSearchComponent#_selectedCategory} has a value set,
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
     * See [_renderSelection()]{@link AbstractSearchComponent#_renderSelection} for information about the function.
     * @param object the {@link Category} or {@link SearchAutocompleteOption} object that was selected in the autocomplete list.
     */
    public renderSelection = (object: Category<any> | SearchAutocompleteOption) => this._renderSelection(object);

    protected constructor(protected _translate: TranslateService,
                          protected _searchService: SearchService,
                          protected _logger: LoggerService,
                          @Optional() protected _searchChipService: SearchChipService) {
        this.filteredOptions = this.formControl.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : this.objectName(value)),
            map(inputText => this._filterOptions(inputText)),
            mergeAll(),
            map(s => s.sort((a, b) => {
                const tmp_a = !!a.translationPath ? this.categoryName(a) : (!!a.text ? a.text : '');
                const tmp_b = !!b.translationPath ? this.categoryName(b) : (!!b.text ? b.text : '');
                return tmp_a.localeCompare(tmp_b);
            }))
        );
        this._searchService.predicateRemoved$.subscribe(event => this.processChipRemoval(event.index));
        if (this._searchChipService) {
            this._searchChipService.addChipRequests$.subscribe(request => this.addExternalChip(request));
        }
    }

    /**
     * @ignore
     * Selects the default operators on the provided categories
     */
    public ngOnInit(): void {
        this.selectDefaultOperators();
    }

    ngOnDestroy(): void {
        this._inputPlaceholder$.complete();
        this._shownInput$.complete();
    }

    public get shownInput$(): Observable<string> {
        return this._shownInput$.asObservable();
    }

    public get shownInput(): string {
        return this._shownInput$.getValue();
    }

    public get inputPlaceholder$(): Observable<string> {
        return this._inputPlaceholder$.asObservable();
    }

    /**
     * @ignore
     * filters available [Categories]{@link Category} based on user input
     * @param userInput string entered by the user
     * @returns [Categories]{@link Category} that start with the user input. Case insensitive. Based on locale translation.
     */
    protected _filterOptions(userInput: string): Observable<Array<Category<any>>> | Observable<Array<SearchAutocompleteOption>> {
        if (!this._selectedCategory) {
            const value = userInput.toLocaleLowerCase();
            return of(this.searchCategories.filter(category => this.categoryName(category).toLocaleLowerCase().startsWith(value)));
        } else {
            if (this._selectedCategory instanceof AutocompleteCategory) {
                return this._selectedCategory.filterOptions(userInput);
            }
            return of([]);
        }
    }

    /**
     * @ignore
     * @param object autocomplete object who's name we want to get
     * @returns the name of the provided object
     */
    protected objectName(object: Category<any> | SearchAutocompleteOption): string {
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
    protected categoryName(category: Category<any>): string {
        return this._translate.instant(category.translationPath) as string;
    }

    /**
     * @ignore
     * Transforms a {@link Category} or {@link SearchAutocompleteOption} object into it's name.
     * Used for displaying user selection in the input field, when an autocomplete option is selected.
     * @param object the object we want to transform. It might not exist if user input doesn't match any autocomplete option
     * @returns translated category name if the {@link Category} exists, empty string otherwise
     */
    protected _renderSelection(object: Category<any> | SearchAutocompleteOption): string {
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
                this._inputPlaceholder$.next(this._selectedCategory.inputPlaceholder);
                this.clearFormControlValue();
                this.updateInputType();
            }
        } else {
            if (inputValue === '') {
                return;
            }
            if (this._selectedCategory.inputType === SearchInputType.AUTOCOMPLETE) {
                if (this._selectedCategory instanceof CaseDataset && !this._selectedCategory.hasSelectedDatafields) {
                    this._selectedCategory.selectDatafields(inputValue.value);
                    this.appendTextToLastChip(`${inputValue.text}: `);
                    this.updateInputType();
                    this._selectedCategory.selectDefaultOperator();
                    this._inputPlaceholder$.next(this._selectedCategory.inputPlaceholder);
                    this.clearFormControlValue();
                    return;
                } else {
                    const predicateIndex = this._searchService.addPredicate(this._selectedCategory.generatePredicate(inputValue.value));
                    this.appendTextToLastChip(inputValue.text);
                    this.searchChips[this.searchChips.length - 1].predicateIndex = predicateIndex;
                }
            } else {
                const predicateIndex = this._searchService.addPredicate(this._selectedCategory.generatePredicate([inputValue]));
                if (this._selectedCategory.inputType === SearchInputType.DATE) {
                    const date = inputValue as Moment;
                    this.appendTextToLastChip(date.format(DATE_FORMAT_STRING));
                } else if (this._selectedCategory.inputType === SearchInputType.DATE_TIME) {
                    const date = inputValue as Moment;
                    this.appendTextToLastChip(date.format(DATE_TIME_FORMAT_STRING));
                } else {
                    this.appendTextToLastChip(inputValue);
                }
                this.searchChips[this.searchChips.length - 1].predicateIndex = predicateIndex;
            }
            if (this._selectedCategory instanceof CaseDataset) {
                this._selectedCategory.reset();
            }
            this._selectedCategory = undefined;
            this._inputPlaceholder$.next('search.placeholder.text');
            this.updateInputType();
            this.clearFormControlValue();
        }
    }

    /**
     * @ignore
     * Appends the provided text to the text of the last chip
     * @param text text that should be appended
     */
    protected appendTextToLastChip(text: string): void {
        this.searchChips[this.searchChips.length - 1].text += text;
    }

    /**
     * @ignore
     * Removes a chip at the given index and affects the state of the input and filter accordingly.
     * @param index index of the chip that should be removed. No bounds checks are performed!
     */
    public removeChip(index: number): void {
        if (!!this._selectedCategory && index === this.searchChips.length - 1) {
            if (this._selectedCategory instanceof CaseDataset) {
                this._selectedCategory.reset();
            }
            this._selectedCategory = undefined;
            this._inputPlaceholder$.next('search.placeholder.text');
            this.formControl.setValue(this.formControl.value); // forces a refresh of autocomplete options
            this.updateInputType();
            this.searchChips.splice(index, 1);
        } else {
            this._searchService.removePredicate(this.searchChips[index].predicateIndex);
        }
    }

    /**
     * @ignore
     * Iterates over all Categories and selects their default Operator.
     */
    protected selectDefaultOperators(): void {
        this.searchCategories.forEach(category => {
            category.selectDefaultOperator();
        });
    }

    /**
     * @ignore
     * Determines which input should be displayed and updates the value in [_shownInput$]{@link AbstractSearchComponent#_shownInput$}.
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
            case SearchInputType.DATE_TIME:
                this._shownInput$.next('dateTime');
                return;
            case SearchInputType.NUMBER:
                this._shownInput$.next('number');
                return;
            case SearchInputType.BOOLEAN:
                this._shownInput$.next('boolean');
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
    protected get formControl(): FormControl {
        return this.formControls[this.shownInput];
    }

    /**
     * @ignore
     * Clears the value of all formcontrols
     */
    protected clearFormControlValue(): void {
        Object.keys(this.formControls).forEach(key => {
            this.formControls[key].reset(key === 'boolean' ? false : '');
            if (key === 'text' && this.textInputRef !== undefined) {
                // TODO 26.5.2020 remove this work-around when the issue is fixed: https://github.com/angular/components/issues/10968
                this.textInputRef.nativeElement.value = '';
            }
        });
    }

    /**
     * Adds a chip into the search GUI and it's query into the {@link SearchService}
     * @param addRequest object that defines the chip that should be added
     */
    protected addExternalChip(addRequest: ChipRequest): void {
        const chip: SimpleSearchChip = {text: addRequest.chipText};
        if (addRequest.chipPredicate) {
            chip.predicateIndex = this._searchService.addPredicate(addRequest.chipPredicate);
        } else if (addRequest.predicateIndex !== undefined) {
            chip.predicateIndex = addRequest.predicateIndex;
        } else {
            this._logger.error('Cannot add chip into search GUi that has neither \'chipPredicate\' nor \'predicateIndex\' defined');
            return;
        }

        let chipPosition = this.searchChips.length;
        if (this._selectedCategory) {
            chipPosition--;
        }

        this.searchChips.splice(chipPosition, 0, chip);
    }

    /**
     * Updates the indices referenced by the chips to still point at their predicates.
     *
     * If a predicate with the same index as one of the chips was removed, removes that chip.
     * @param removedIndex the index of the removed {@link Predicate}
     */
    protected processChipRemoval(removedIndex: number): void {
        let index;
        this.searchChips.forEach((chip, i) => {
            if (chip.predicateIndex !== undefined && chip.predicateIndex === removedIndex) {
                index = i;
                return; // continue;
            } else if (chip.predicateIndex !== undefined && chip.predicateIndex > removedIndex) {
                chip.predicateIndex -= 1;
            }
        });
        if (index !== undefined) {
            this.searchChips.splice(index, 1);
        }
    }
}
