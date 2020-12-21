import {Component} from '@angular/core';
import {AbstractSearchPredicateComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-search-predicate',
    templateUrl: './search-predicate.component.html',
    styleUrls: ['./search-predicate.component.scss']
})
export class SearchPredicateComponent extends AbstractSearchPredicateComponent {
    constructor() {
        super();
    }
}
