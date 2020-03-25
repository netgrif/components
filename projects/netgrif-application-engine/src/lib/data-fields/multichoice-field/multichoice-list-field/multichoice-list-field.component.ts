import {Component, Input} from '@angular/core';
import {MultichoiceField} from '../models/multichoice-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

@Component({
  selector: 'nae-multichoice-list-field',
  templateUrl: './multichoice-list-field.component.html',
  styleUrls: ['./multichoice-list-field.component.scss']
})
export class MultichoiceListFieldComponent {

    @Input() multichoiceField: MultichoiceField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    selected: Array<string>;
    validate: FormControl;

}
