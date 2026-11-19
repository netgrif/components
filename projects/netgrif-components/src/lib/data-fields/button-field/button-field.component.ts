import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {AbstractButtonFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-button-field',
    templateUrl: './button-field.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ButtonFieldComponent extends AbstractButtonFieldComponent {

    public align: string;
    public stretch: string;

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

}
