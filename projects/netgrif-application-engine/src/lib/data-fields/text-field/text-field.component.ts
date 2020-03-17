import {Component, Input} from '@angular/core';
import {TextField} from './models/text-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

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
export class TextFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: TextField;

    constructor() {
        super();
    }

}
