import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractTextFieldComponent,
    NAE_INFORM_ABOUT_INVALID_DATA,
    NAE_SAVE_DATA_INFORM,
    TextFieldComponent as TextFieldComponentEnum
} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-text-field',
    templateUrl: './text-field.component.html',
    styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent extends AbstractTextFieldComponent {

    textFieldComponentEnum = TextFieldComponentEnum;

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) saveDataInform: boolean | null) {
        super(informAboutInvalidData, saveDataInform);
    }
}
