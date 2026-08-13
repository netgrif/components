import {Component, Inject, Optional, Type} from '@angular/core';
import {
    AbstractSearchPredicateComponent,
    AdvancedSearchComponentInitializationService,
    Category, LoggerService,
    NAE_SEARCH_CATEGORIES,
    CategoryFactory,
    NAE_IGNORE_NETS_ON_AUTOCOMPLETE_CATEGORY
} from '@netgrif/components-core';

@Component({
    selector: 'nc-search-predicate',
    templateUrl: './search-predicate.component.html',
    styleUrls: ['./search-predicate.component.scss']
})
export class SearchPredicateComponent extends AbstractSearchPredicateComponent {

    constructor(@Inject(NAE_SEARCH_CATEGORIES) searchCategories: Array<Type<Category<any>>>,
                logger: LoggerService,
                initializationService: AdvancedSearchComponentInitializationService,
                categoryFactory: CategoryFactory,
                @Optional() @Inject(NAE_IGNORE_NETS_ON_AUTOCOMPLETE_CATEGORY) ignoreNetsOnAutocompleteCategory: boolean) {
        super(searchCategories, logger, initializationService, categoryFactory, ignoreNetsOnAutocompleteCategory);
    }
}
