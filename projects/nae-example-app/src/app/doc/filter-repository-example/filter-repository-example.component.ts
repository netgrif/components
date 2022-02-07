import {Component, OnInit} from '@angular/core';
import {FilterRepository, MergeOperator} from '@netgrif/components-core';

@Component({
    selector: 'nae-app-filter-repository-example',
    templateUrl: './filter-repository-example.component.html',
    styleUrls: ['./filter-repository-example.component.scss']
})
export class FilterRepositoryExampleComponent implements OnInit {

    public readonly TITLE = 'Filter Repository example';
    public readonly DESCRIPTION = '';

    public caseFilters = [];
    public taskFilters = [];
    public merged;

    constructor(private filterRepository: FilterRepository) {
        filterRepository.getCaseFilterList().forEach( filterId => {
            this.caseFilters.push(JSON.stringify(filterRepository.getFilter(filterId).getRequestBody(), null, 4));
        });
        filterRepository.getTaskFilterList().forEach( filterId => {
            this.taskFilters.push(JSON.stringify(filterRepository.getFilter(filterId).getRequestBody(), null, 4));
        });
        this.merged = JSON.stringify(
            filterRepository.getFilter('all-cases').merge(
                filterRepository.getFilter('data-cases'), MergeOperator.AND
            ).getRequestBody()
        );
    }

    ngOnInit(): void {
    }

}

/* Example filters
'all-cases': {
    title: 'All Cases',
    access: 'public',
    query: {},
    type: 'Case'
},
'all-tasks': {
    title: 'All Tasks',
    access: 'public',
    query: {},
    type: 'Task'
},
'data-cases': {
    title: 'Data Cases',
    access: 'public',
    query: {
        petriNet: {
            identifier: 'data'
        }
    },
    type: 'Case'
}
 */
