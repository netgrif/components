import {Component} from '@angular/core';
import {AbstractSearchClauseComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-search-clause',
    templateUrl: './search-clause.component.html',
    styleUrls: ['./search-clause.component.scss']
})
export class SearchClauseComponent extends AbstractSearchClauseComponent {
    constructor() {
        super();
    }
}
