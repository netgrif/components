import {Component, Inject, OnInit} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {FilterRepository} from '../../../filter/filter.repository';
import {Filter} from '../../../filter/models/filter';
import {FilterSelectorInjectionData} from './model/filter-selector-injection-data';
import {FilteredArray} from './model/filtered-array';
import {FilterType} from '../../../filter/models/filter-type';

@Component({
    selector: 'nae-filter-selector',
    templateUrl: './filter-selector.component.html',
    styleUrls: ['./filter-selector.component.scss']
})
export class FilterSelectorComponent {

    public cases: FilteredArray<Filter>;
    public tasks: FilteredArray<Filter>;

    private _filterPredicate = (item: Filter, data: string) => item.title ? item.title.includes(data) : item.id.includes(data);

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl,
                private _filterRepository: FilterRepository) {
        const filterConstraints = _sideMenuControl.data as FilterSelectorInjectionData;

        let cases = [];
        let tasks = [];
        if (filterConstraints.filterIdsConstraint) {
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
            if ( !filterConstraints.filterTypeConstraint || filterConstraints.filterTypeConstraint === FilterType.CASE) {
                cases = this._filterRepository.getFilters(this._filterRepository.getCaseFilterList());
            }
            if ( !filterConstraints.filterTypeConstraint || filterConstraints.filterTypeConstraint === FilterType.TASK) {
                tasks = this._filterRepository.getFilters(this._filterRepository.getTaskFilterList());
            }
        }

        this.cases = new FilteredArray<Filter>(cases, this._filterPredicate);
        this.tasks = new FilteredArray<Filter>(tasks, this._filterPredicate);
    }

}
