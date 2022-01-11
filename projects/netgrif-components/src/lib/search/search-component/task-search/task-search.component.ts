import {Component} from '@angular/core';
import {CategoryFactory, defaultTaskSearchCategoriesFactory, NAE_SEARCH_CATEGORIES} from '@netgrif/application-engine';

/**
 * A component that provides the default task search categories.
 *
 * @deprecated in 5.0.0 - Use the universal {@link SearchComponent} instead and provide the {@link NAE_SEARCH_CATEGORIES} yourself
 * (a [factory method]{@link defaultTaskSearchCategoriesFactory} can be used).
 */
@Component({
    selector: 'nc-task-search',
    templateUrl: './task-search.component.html',
    styleUrls: ['./task-search.component.scss'],
    providers: [
        CategoryFactory,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]}
    ]
})
export class TaskSearchComponent {
}
