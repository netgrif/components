import {Component, Input, OnInit} from '@angular/core';
import {MultichoiceField} from "../multichoice-field";
import {FormControl, Validators} from "@angular/forms";
import {WrappedBoolean} from "../../data-field-template/wrapped-boolean";

@Component({
  selector: 'nae-multichoice-list-field',
  templateUrl: './multichoice-list-field.component.html',
  styleUrls: ['./multichoice-list-field.component.scss']
})
export class MultichoiceListFieldComponent implements OnInit {

    @Input() multichoiceField: MultichoiceField;
    @Input() showLargeLayout: WrappedBoolean;

    selected: Array<string>;
    validate: FormControl;

    ngOnInit() {
        this.validate = new FormControl(this.multichoiceField.value, [Validators.required]);
        this.selected = this.multichoiceField.value.map( it => it.key);
        this.validate.setValue(this.selected);
    }

}
