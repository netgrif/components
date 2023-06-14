import {Component, Inject, Optional} from '@angular/core';
import {AbstractBooleanFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-boolean-field',
    templateUrl: './boolean-field.component.html',
    styleUrls: ['./boolean-field.component.scss']
})
export class BooleanFieldComponent extends AbstractBooleanFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
