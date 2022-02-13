import {Component} from '@angular/core';
import {AbstractSearchClauseComponent} from '@netgrif/components-core';

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
