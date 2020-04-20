import {Component, Inject, ViewChild} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {FilterRepository} from '../../../filter/filter.repository';
import {Filter} from '../../../filter/models/filter';
import {FilterSelectorInjectionData} from './model/filter-selector-injection-data';
import {FilteredArray} from './model/filtered-array';
import {FilterType} from '../../../filter/models/filter-type';
import {SelectLanguageService} from '../../../toolbar/select-language.service';
import {MatSelectionList, MatSelectionListChange} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'nae-filter-selector',
    templateUrl: './filter-selector.component.html',
    styleUrls: ['./filter-selector.component.scss']
})
export class FilterSelectorComponent {

    public caseFilters: FilteredArray<Filter>;
    public taskFilters: FilteredArray<Filter>;

    public searchFormControl: FormControl;

    private _selectedFilter: Filter;

    @ViewChild('caseFilterList') caseFilterList: MatSelectionList;
    @ViewChild('taskFilterList') taskFilterList: MatSelectionList;

    private _filterPredicate = (item: Filter, data: string) => {
        return item.title
        ? item.title.toLocaleLowerCase().includes(data.toLocaleLowerCase())
        : item.id.toLocaleLowerCase().includes(data.toLocaleLowerCase());
    }

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl,
                private _filterRepository: FilterRepository, private _i18n: SelectLanguageService) {
        const filterConstraints = _sideMenuControl.data as FilterSelectorInjectionData;

        let caseFilters = [];
        let taskFilters = [];
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
        this.searchFormControl.valueChanges.subscribe(newValue => this.filterFilters(newValue));
    }

    public filterSelected(filter: Filter): void {
        this._selectedFilter = filter;
        this._sideMenuControl.publish({
            opened: true,
            message: 'New selected filter',
            data: this._selectedFilter
        });
    }

    public filterSelectionConfirmed(): void {
        if (this._selectedFilter !== undefined) {
            this._sideMenuControl.close({
                opened: false,
                message: 'Selected filter was confirmed',
                data: this._selectedFilter
            });
        }
    }

    public caseFilterSelected(event: MatSelectionListChange): void {
        if (event.option.selected) {
            this.filterSelected(event.option.value);
            if (this.taskFilterList) {
                this.taskFilterList.deselectAll();
            }
            // TODO 20.4.2020 - change to [multiple] input attribute on MatSelectionList in HTML,
            //  once Covalent supports material 9.1.0 or above
            this.caseFilterList.deselectAll();
            event.option.selected = true;
        } else {
            this.filterSelected(undefined);
        }
    }

    public taskFilterSelected(event: MatSelectionListChange): void {
        if (event.option.selected) {
            this.filterSelected(event.option.value);
            if (this.caseFilterList) {
                this.caseFilterList.deselectAll();
            }
            // TODO 20.4.2020 - change to [multiple] input attribute on MatSelectionList in HTML,
            //  once Covalent supports material 9.1.0 or above
            this.taskFilterList.deselectAll();
            event.option.selected = true;
        } else {
            this.filterSelected(undefined);
        }
    }

    public filterFilters(newValue: string): void {
        this.caseFilters.filter(newValue);
        this.taskFilters.filter(newValue);
    }
}
