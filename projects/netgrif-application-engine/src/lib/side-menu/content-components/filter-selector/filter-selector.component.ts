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

@Component({
    selector: 'nae-filter-selector',
    templateUrl: './filter-selector.component.html',
    styleUrls: ['./filter-selector.component.scss']
})
export class FilterSelectorComponent {

    public cases: FilteredArray<Filter>;
    public tasks: FilteredArray<Filter>;

    private _selectedFilter: Filter;

    @ViewChild('caseFilterList') caseFilterList: MatSelectionList;
    @ViewChild('taskFilterList') taskFilterList: MatSelectionList;

    private _filterPredicate = (item: Filter, data: string) => item.title ? item.title.includes(data) : item.id.includes(data);

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl,
                private _filterRepository: FilterRepository, private _i18n: SelectLanguageService) {
        const filterConstraints = _sideMenuControl.data as FilterSelectorInjectionData;

        let cases = [];
        let tasks = [];
        if (filterConstraints && filterConstraints.filterIdsConstraint) {
            const filters = this._filterRepository.getFilters(filterConstraints.filterIdsConstraint);
            filters.forEach(filter => {
                if (filter.type === FilterType.CASE &&
                    (!filterConstraints.filterTypeConstraint || filterConstraints.filterTypeConstraint === FilterType.CASE)) {
                    cases.push(filter);
                } else if (filter.type === FilterType.TASK &&
                    (!filterConstraints.filterTypeConstraint || filterConstraints.filterTypeConstraint === FilterType.TASK)) {
                    tasks.push(filter);
                }
            });
        } else {
            if (!filterConstraints ||
                !filterConstraints.filterTypeConstraint ||
                filterConstraints.filterTypeConstraint === FilterType.CASE) {
                cases = this._filterRepository.getFilters(this._filterRepository.getCaseFilterList());
            }
            if (!filterConstraints ||
                !filterConstraints.filterTypeConstraint ||
                filterConstraints.filterTypeConstraint === FilterType.TASK) {
                tasks = this._filterRepository.getFilters(this._filterRepository.getTaskFilterList());
            }
        }

        this.cases = new FilteredArray<Filter>(cases, this._filterPredicate);
        this.tasks = new FilteredArray<Filter>(tasks, this._filterPredicate);
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
        this.filterSelected(event.option.value);
        if (this.taskFilterList) {
           this.taskFilterList.deselectAll();
        }
        // TODO 20.4.2020 - change to [multiple] input attribute on MatSelectionList in HTML, once Covalent supports material 9.1.0 or above
        if (event.option.selected) {
            this.caseFilterList.deselectAll();
            event.option.selected = true;
        }
    }

    public taskFilterSelected(event: MatSelectionListChange): void {
        this.filterSelected(event.option.value);
        if (this.caseFilterList) {
            this.caseFilterList.deselectAll();
        }
        // TODO 20.4.2020 - change to [multiple] input attribute on MatSelectionList in HTML, once Covalent supports material 9.1.0 or above
        if (event.option.selected) {
            this.taskFilterList.deselectAll();
            event.option.selected = true;
        }
    }
}
