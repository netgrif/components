import {Component} from '@angular/core';
import {
    AbstractSearchOperandInputComponent,
    DATE_FORMAT_STRING, DATE_TIME_FORMAT,
    DATE_TIME_FORMAT_STRING,
    SearchInputType
} from '@netgrif/components-core';

@Component({
    selector: 'nc-search-operand-input',
    templateUrl: './search-operand-input.component.html',
    styleUrls: ['./search-operand-input.component.scss'],
    standalone: false
})
export class SearchOperandInputComponent extends AbstractSearchOperandInputComponent {

    // make enum accessible in HTMl
    public searchInputType = SearchInputType;

    public dateFormat = DATE_FORMAT_STRING;
    public dateTimeFormat = DATE_TIME_FORMAT_STRING;

    constructor() {
        super();
    }
}
