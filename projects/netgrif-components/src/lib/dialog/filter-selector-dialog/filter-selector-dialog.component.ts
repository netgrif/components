import {Component, Inject, OnDestroy, ViewChild} from '@angular/core';
import {
    Filter, FilteredArray,
    FilterRepository,
    FilterSelectorInjectionData, FilterType,
    SideMenuInjectionData
} from '@netgrif/components-core';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatSelectionList, MatSelectionListChange} from '@angular/material/list';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'nc-filter-selector-dialog',
  templateUrl: './filter-selector-dialog.component.html',
  styleUrls: ['./filter-selector-dialog.component.scss']
})
export class FilterSelectorDialogComponent implements OnDestroy {

    /**
     * @ignore
     * Case filters bound to HTML
     */
    public caseFilters: FilteredArray<Filter>;
    /**
     * @ignore
     * Task filters bound to html
     */
    public taskFilters: FilteredArray<Filter>;
    /**
     * @ignore
     * Task filters bound to html
     */
    protected subValue: Subscription;
    /**
     * @ignore
     * `FormControl` for the search input
     */
    public searchFormControl: FormControl;

    /**
     * @ignore
     * Currently selected filter. `undefined` if no filter is selected.
     */
    protected _selectedFilter: Filter;

    /**
     * @ignore
     * Reference to the `mat-selection-list` component, that holds the list of case filters.
     */
    @ViewChild('caseFilterList') caseFilterList: MatSelectionList;
    /**
     * @ignore
     * Reference to the `mat-selection-list` component, that holds the list of task filters.
     */
    @ViewChild('taskFilterList') taskFilterList: MatSelectionList;

    /**
     * @ignore
     * Stores the predicate used for filtering of filters with {@linkFilteredArray}.
     * @param item some filter from the list
     * @param searchInput value the user is searching for
     */
    protected _filterPredicate = (item: Filter, searchInput: string) => {
        return item.title
            ? item.title.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
            : item.id.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase());
    }

    /**
     * Retrieves the {@link Filter} objects from the {@link FilterRepository} and instantiates this component.
     *
     * Filters that are available for selection can be set using the injected data. See {@link FilterSelectorInjectionData}
     * for more information.
     * @param _dialogRef -
     * @param _data
     * @param _filterRepository -
     */
    constructor(protected _dialogRef: MatDialogRef<FilterSelectorDialogComponent>,
                @Inject(MAT_DIALOG_DATA) protected _data: SideMenuInjectionData,
                protected _filterRepository: FilterRepository) {
        const filterConstraints = this._data as FilterSelectorInjectionData;

        let caseFilters = [];
        let taskFilters = [];
        if (filterConstraints?.filterIdsConstraint) {
            const filters = this._filterRepository.getFilters(filterConstraints.filterIdsConstraint);
            filters.forEach(filter => {
                if (filter.type === FilterType.CASE &&
                    (!filterConstraints.filterTypeConstraint || filterConstraints.filterTypeConstraint === FilterType.CASE)) {
                    caseFilters.push(filter);
                } else if (filter.type === FilterType.TASK &&
                    (!filterConstraints.filterTypeConstraint || filterConstraints.filterTypeConstraint === FilterType.TASK)) {
                    taskFilters.push(filter);
                }
            });
        } else {
            if (!filterConstraints?.filterTypeConstraint ||
                filterConstraints?.filterTypeConstraint === FilterType.CASE) {
                caseFilters = this._filterRepository.getFilters(this._filterRepository.getCaseFilterList());
            }
            if (!filterConstraints?.filterTypeConstraint ||
                filterConstraints.filterTypeConstraint === FilterType.TASK) {
                taskFilters = this._filterRepository.getFilters(this._filterRepository.getTaskFilterList());
            }
        }

        this.caseFilters = new FilteredArray<Filter>(caseFilters, this._filterPredicate);
        this.taskFilters = new FilteredArray<Filter>(taskFilters, this._filterPredicate);

        this.searchFormControl = new FormControl();
        this.subValue = this.searchFormControl.valueChanges.subscribe(newValue => this.filterFilters(newValue));
    }

    ngOnDestroy(): void {
        this.subValue.unsubscribe();
    }

    /**
     * @ignore
     * Changes the currently selected filter and publishes an event about this to the output stream in {@link SideMenuControl}.
     * @param filter the newly selected filter
     */
    public filterSelected(filter: Filter): void {
        this._selectedFilter = filter;
    }

    /**
     * @ignore
     * Closes the side menu and publishes an event with the currently selected filter.
     */
    public filterSelectionConfirmed(): void {
        if (this._selectedFilter !== undefined) {
            this._dialogRef.close({
                opened: false,
                message: 'Selected filter was confirmed',
                data: this._selectedFilter
            });
        }
    }

    /**
     * @ignore
     * Clears selection of task filters and ensures that only one case filter can be selected at once.
     * @param event list change event published byt the material component
     */
    public caseFilterSelected(event: MatSelectionListChange): void {
        if (event.options[0].selected) {
            this.filterSelected(event.options[0].value);
            if (this.taskFilterList) {
                this.taskFilterList.deselectAll();
            }
            // TODO 20.4.2020 - change to [multiple] input attribute on MatSelectionList in HTML,
            //  once Covalent supports material 9.1.0 or above
            this.caseFilterList.deselectAll();
            event.options[0].selected = true;
        } else {
            this.filterSelected(undefined);
        }
    }

    /**
     * @ignore
     * Clears selection of case filters and ensures that only one task filter can be selected at once.
     * @param event list change event published byt the material component
     */
    public taskFilterSelected(event: MatSelectionListChange): void {
        if (event.options[0].selected) {
            this.filterSelected(event.options[0].value);
            if (this.caseFilterList) {
                this.caseFilterList.deselectAll();
            }
            // TODO 20.4.2020 - change to [multiple] input attribute on MatSelectionList in HTML,
            //  once Covalent supports material 9.1.0 or above
            this.taskFilterList.deselectAll();
            event.options[0].selected = true;
        } else {
            this.filterSelected(undefined);
        }
    }

    /**
     * @ignore
     * Filters both lists of filters based on user search input.
     * @param newValue user search input value
     */
    public filterFilters(newValue: string): void {
        this.caseFilters.filter(newValue);
        this.taskFilters.filter(newValue);
    }
}
