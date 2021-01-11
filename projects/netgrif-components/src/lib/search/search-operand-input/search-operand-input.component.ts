import {Component} from '@angular/core';
import {AbstractSearchOperandInputComponent, SearchInputType} from '@netgrif/application-engine';

@Component({
    selector: 'nc-search-operand-input',
    templateUrl: './search-operand-input.component.html',
    styleUrls: ['./search-operand-input.component.scss']
})
export class SearchOperandInputComponent extends AbstractSearchOperandInputComponent {

    // make enum accessible in HTMl
    public searchInputType = SearchInputType;

    constructor() {
        super();
    }
}
