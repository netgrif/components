import {MAT_DATE_FORMATS} from '@angular/material/core';
import {Component, ChangeDetectionStrategy} from '@angular/core';
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
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SearchOperandInputComponent extends AbstractSearchOperandInputComponent {

    // make enum accessible in HTMl
    public searchInputType = SearchInputType;

    constructor() {
        super();
    }
}
