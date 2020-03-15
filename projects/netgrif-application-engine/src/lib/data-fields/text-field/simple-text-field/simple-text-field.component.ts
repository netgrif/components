import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TextField} from '../models/text-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

@Component({
    selector: 'nae-simple-text-field',
    templateUrl: './simple-text-field.component.html',
    styleUrls: ['./simple-text-field.component.scss']
})
export class SimpleTextFieldComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);
    @Input() textField: TextField;
    @Input() showLargeLayout: WrappedBoolean;

    constructor() {
    }

    ngOnInit() {

    }

    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' : '';
    }
}
