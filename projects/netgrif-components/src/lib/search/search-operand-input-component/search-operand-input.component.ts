import {NGX_MAT_DATE_FORMATS} from '@angular-material-components/datetime-picker';
import {Component} from '@angular/core';
import {
    AbstractSearchOperandInputComponent,
    DATE_FORMAT_STRING, DATE_TIME_FORMAT,
    DATE_TIME_FORMAT_STRING,
    SearchInputType
} from '@netgrif/application-engine';

@Component({
    selector: 'nc-search-operand-input',
    templateUrl: './search-operand-input.component.html',
    styleUrls: ['./search-operand-input.component.scss'],
    providers: [
        {provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ]
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
