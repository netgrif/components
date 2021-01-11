import {Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SearchInputType} from '../models/category/search-input-type';


export class AbstractSearchOperandInputComponent {

    @Input() formControl: FormControl;
    @Input() inputType: SearchInputType;
}
