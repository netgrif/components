import {TranslateService} from '@ngx-translate/core';
import {SearchService} from '../search-service/search.service';
import {LoggerService} from '../../logger/services/logger.service';

/**
 * A universal search component that can be used to interactively create search predicates for anything with supported categories.
 *
 * This component is responsible for the interactive creation of an AND {@link ClausePredicate} object instance.
 * The nested Predicates are OR {@link ClausePredicate} instances created by {@link AbstractSearchClauseComponent}.
 *
 * Search categories must be provided by the {@link NAE_SEARCH_CATEGORIES} injection token.
 * Default factory methods for [task]{@link defaultTaskSearchCategoriesFactoryMethod} and
 * [case]{@link defaultCaseSearchCategoriesFactoryMethod} search categories exist. See their documentation for more information.
 */
export abstract class AbstractSearchComponent {


    protected constructor(protected _translate: TranslateService,
                          protected _searchService: SearchService,
                          protected _logger: LoggerService) {

    }
}
