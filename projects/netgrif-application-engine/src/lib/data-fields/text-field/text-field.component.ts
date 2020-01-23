import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {TextField} from "./text-field";

export enum TextFieldType {
    LEGACY = 'legacy',
    STANDARD = 'standard',
    FILL = 'fill',
    OUTLINE = 'outline'
}

@Component({
    selector: 'nae-text-field',
    templateUrl: './text-field.component.html',
    styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit{

    email = new FormControl('', [Validators.required, Validators.email]);
    @Input() textField: TextField;
    constructor() {}

    ngOnInit(){

    }

    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' : '';
    }

}
