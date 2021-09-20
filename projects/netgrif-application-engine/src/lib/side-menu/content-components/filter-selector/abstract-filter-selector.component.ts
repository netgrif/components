import {Inject, OnDestroy, ViewChild} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {SideMenuControl} from '../../models/side-menu-control';
import {FilterRepository} from '../../../filter/filter.repository';
import {Filter} from '../../../filter/models/filter';
import {FilterSelectorInjectionData} from './model/filter-selector-injection-data';
import {FilteredArray} from './model/filtered-array';
import {FilterType} from '../../../filter/models/filter-type';
import {FormControl} from '@angular/forms';
import {MatSelectionList, MatSelectionListChange} from '@angular/material/list';
import {Subscription} from 'rxjs';

/**
 * Allows user to choose a {@link Filter} from the {@link FilterRepository}.
 *
 * Publishes events to the {@link SideMenuControl} object when:
 *
 * - filter is selected by the user. Message: `New selected filter`, Data: is either the selected filter or `undefined` if the user
 * deselected the filter
 *
 * - filter selection is confirmed by the user. Message: `Selected filter was confirmed`, Data: the selected filter. If the user didn't
 * select any filter this event will not be published.
 *
 */
export abstract class AbstractFilterSelectorComponent implements OnDestroy {

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
    protected _selectedFilter: Filter | undefined;

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
     * @param _sideMenuControl -
     * @param _filterRepository -
     */
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                protected _filterRepository: FilterRepository) {
        const filterConstraints = _sideMenuControl.data as FilterSelectorInjectionData;

        let caseFilters: Array<Filter> = [];
        let taskFilters: Array<Filter> = [];
        if (filterConstraints && filterConstraints.filterIdsConstraint) {
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
            if (!filterConstraints ||
                !filterConstraints.filterTypeConstraint ||
                filterConstraints.filterTypeConstraint === FilterType.CASE) {
                caseFilters = this._filterRepository.getFilters(this._filterRepository.getCaseFilterList());
            }
            if (!filterConstraints ||
                !filterConstraints.filterTypeConstraint ||
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
    public filterSelected(filter: Filter | undefined): void {
        this._selectedFilter = filter;
        this._sideMenuControl.publish({
            opened: true,
            message: 'New selected filter',
            data: this._selectedFilter
        });
    }

    /**
     * @ignore
     * Closes the side menu and publishes an event with the currently selected filter.
     */
    public filterSelectionConfirmed(): void {
        if (this._selectedFilter !== undefined) {
            this._sideMenuControl.close({
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
