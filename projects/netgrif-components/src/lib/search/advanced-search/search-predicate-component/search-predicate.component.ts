import {Component, Inject} from '@angular/core';
import {
    AbstractSearchPredicateComponent,
    AdvancedSearchComponentInitializationService,
    Category, LoggerService,
    NAE_SEARCH_CATEGORIES,
} from '@netgrif/application-engine';

@Component({
    selector: 'nc-search-predicate',
    templateUrl: './search-predicate.component.html',
    styleUrls: ['./search-predicate.component.scss']
})
export class SearchPredicateComponent extends AbstractSearchPredicateComponent {

    constructor(@Inject(NAE_SEARCH_CATEGORIES) searchCategories: Array<Category<any>>,
                logger: LoggerService,
                initializationService: AdvancedSearchComponentInitializationService) {
        super(searchCategories, logger, initializationService);
    }
}
