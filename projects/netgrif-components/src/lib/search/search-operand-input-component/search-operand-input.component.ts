import {Component} from '@angular/core';
import {AbstractSearchOperandInputComponent, DATE_FORMAT_STRING, SearchInputType} from '@netgrif/application-engine';

@Component({
    selector: 'nc-search-operand-input',
    templateUrl: './search-operand-input.component.html',
    styleUrls: ['./search-operand-input.component.scss']
})
export class SearchOperandInputComponent extends AbstractSearchOperandInputComponent {

    // make enum accessible in HTMl
    public searchInputType = SearchInputType;

    public dateFormat = DATE_FORMAT_STRING;

    constructor() {
        super();
    }
}