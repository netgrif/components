import {Component, Inject} from '@angular/core';
import {
    AbstractSearchPredicateComponent, AutocompleteCategory,
    Category, LoggerService,
    NAE_SEARCH_CATEGORIES,
    OperatorTemplatePartType,
    SearchAutocompleteOption,
    SearchInputType
} from '@netgrif/application-engine';
import {Observable} from 'rxjs';

@Component({
    selector: 'nc-search-predicate',
    templateUrl: './search-predicate.component.html',
    styleUrls: ['./search-predicate.component.scss']
})
export class SearchPredicateComponent extends AbstractSearchPredicateComponent {

    // make the enum referencable in HTML
    public searchInputType = SearchInputType;
    // make the enum referencable in HTML
    public operatorTemplatePartType = OperatorTemplatePartType;

    constructor(@Inject(NAE_SEARCH_CATEGORIES) searchCategories: Array<Category<any>>, logger: LoggerService) {
        super(searchCategories, logger);
    }

    public filterOptions: (userInput: Observable<string>) => Observable<Array<SearchAutocompleteOption>> = userInput  => {
        return (this.selectedCategory as AutocompleteCategory<any>).filterOptions(userInput);
    }
}
