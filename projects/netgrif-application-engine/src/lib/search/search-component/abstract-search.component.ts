import {SearchService} from '../search-service/search.service';
import {LoggerService} from '../../logger/services/logger.service';
import {DialogService} from '../../dialog/services/dialog.service';
import {TranslateService} from '@ngx-translate/core';

/**
 * A universal search component that can be used to interactively create search predicates for anything with supported categories.
 *
 * This component is responsible for the interactive creation of an AND {@link ClausePredicate} object instance.
 * The nested Predicates are OR {@link ClausePredicate} instances created by {@link AbstractSearchClauseComponent}.
 *
 * Search categories must be provided by the {@link NAE_SEARCH_CATEGORIES} injection token.
 * Default factory methods for [task]{@link defaultTaskSearchCategoriesFactory} and
 * [case]{@link defaultCaseSearchCategoriesFactory} search categories exist. See their documentation for more information.
 */
export abstract class AbstractSearchComponent {

    public advancedSearchDisplayed = false;

    protected constructor(protected _searchService: SearchService,
                          protected _logger: LoggerService,
                          protected _dialogService: DialogService,
                          protected _translate: TranslateService) {
    }

    public hasPredicates(): boolean {
        return Array.from(this._searchService.rootPredicate.getPredicateMap().values()).some(value => value.isVisible);
    }

    public toggleSearchMode(): void {
        if (this.advancedSearchDisplayed) {
            this._searchService.clearPredicates();
        } else {
            this._searchService.clearFullTextFilter();
        }

        this.advancedSearchDisplayed = !this.advancedSearchDisplayed;
    }

    public showHelp(): void {
        this._dialogService.openAlertDialog(this._translate.instant('search.help.title'), this._translate.instant('search.help.text'));
    }
}
