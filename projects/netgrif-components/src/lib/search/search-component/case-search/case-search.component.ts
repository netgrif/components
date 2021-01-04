import {Component} from '@angular/core';
import {CategoryFactory, defaultCaseSearchCategoriesFactory, NAE_SEARCH_CATEGORIES} from '@netgrif/application-engine';

/**
 * A component that provides the default case search categories.
 *
 * @deprecated in 5.0.0 - Use the universal {@link SearchComponent} instead and provide the {@link NAE_SEARCH_CATEGORIES} yourself
 * (a [factory method]{@link defaultCaseSearchCategoriesFactory} can be used).
 */
@Component({
    selector: 'nc-case-search',
    templateUrl: './case-search.component.html',
    styleUrls: ['./case-search.component.scss'],
    providers: [
        CategoryFactory,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]}
    ]
})
export class CaseSearchComponent {
}
