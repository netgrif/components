import {Component, Inject, Type} from '@angular/core';
import {
    AbstractSearchPredicateComponent,
    AdvancedSearchComponentInitializationService,
    Category, LoggerService,
    NAE_SEARCH_CATEGORIES,
    CategoryFactory
} from '@netgrif/application-engine';

@Component({
    selector: 'nc-search-predicate',
    templateUrl: './search-predicate.component.html',
    styleUrls: ['./search-predicate.component.scss']
})
export class SearchPredicateComponent extends AbstractSearchPredicateComponent {

    constructor(@Inject(NAE_SEARCH_CATEGORIES) searchCategories: Array<Type<Category<any>>>,
                logger: LoggerService,
                initializationService: AdvancedSearchComponentInitializationService,
                categoryFactory: CategoryFactory) {
        super(searchCategories, logger, initializationService, categoryFactory);
    }
}
