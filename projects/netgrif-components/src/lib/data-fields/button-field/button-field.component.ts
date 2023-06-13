import {Component, Inject, Optional} from '@angular/core';
import {AbstractButtonFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

@Component({
    selector: 'nc-button-field',
    templateUrl: './button-field.component.html',
    styleUrls: ['./button-field.component.scss']
})
export class ButtonFieldComponent extends AbstractButtonFieldComponent {

    public align: string;
    public stretch: string;

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

}
