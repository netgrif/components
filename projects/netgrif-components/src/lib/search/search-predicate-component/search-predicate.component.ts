import {Component, Inject} from '@angular/core';
import {
    AbstractSearchPredicateComponent,
    Category,
    NAE_SEARCH_CATEGORIES,
    OperatorTemplatePartType,
    SearchInputType
} from '@netgrif/application-engine';

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

    constructor(@Inject(NAE_SEARCH_CATEGORIES) searchCategories: Array<Category<any>>) {
        super(searchCategories);
    }
}
