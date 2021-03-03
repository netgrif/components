import {Component} from '@angular/core';
import {AbstractFulltextSearchComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-fulltext-search',
    templateUrl: './fulltext-search.component.html',
    styleUrls: ['./fulltext-search.component.scss']
})
export class FulltextSearchComponent extends AbstractFulltextSearchComponent {

    constructor() {
        super();
    }

}
