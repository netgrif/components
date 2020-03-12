import {Component, Input, OnInit} from '@angular/core';
import {MultichoiceField} from '../multichoice-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/wrapped-boolean';

@Component({
    selector: 'nae-multichoice-select-field',
    templateUrl: './multichoice-select-field.component.html',
    styleUrls: ['./multichoice-select-field.component.scss']
})
export class MultichoiceSelectFieldComponent implements OnInit {

    @Input() multichoiceField: MultichoiceField;
    @Input() showLargeLayout: WrappedBoolean;
    selected: Array<string>;
    validate: FormControl;

    ngOnInit() {
        // this.validate = new FormControl('', [Validators.required]);
        this.selected = this.multichoiceField.value.map( it => it.key);
        // this.validate.setValue(this.selected);
    }
}
