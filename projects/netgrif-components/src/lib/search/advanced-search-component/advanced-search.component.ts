import {Component} from '@angular/core';
import {AbstractAdvancedSearchComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-advanced-search',
    templateUrl: './advanced-search.component.html',
    styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent extends AbstractAdvancedSearchComponent {

    constructor() {
        super();
    }

}
