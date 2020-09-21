import {Component} from '@angular/core';
import {AbstractTextFieldComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-text-field',
    templateUrl: './text-field.component.html',
    styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent extends AbstractTextFieldComponent {

    constructor() {
        super();
    }
}
