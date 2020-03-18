import {Component, Input} from '@angular/core';
import {MultichoiceField} from '../models/multichoice-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

@Component({
    selector: 'nae-multichoice-select-field',
    templateUrl: './multichoice-select-field.component.html',
    styleUrls: ['./multichoice-select-field.component.scss']
})
export class MultichoiceSelectFieldComponent {

    @Input() multichoiceField: MultichoiceField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

}
