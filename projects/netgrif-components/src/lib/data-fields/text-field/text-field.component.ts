import {Component, Inject, Optional} from '@angular/core';
import {AbstractTextFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-text-field',
    templateUrl: './text-field.component.html',
    styleUrls: ['./text-field.component.scss'],
    standalone: false
})
export class TextFieldComponent extends AbstractTextFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
