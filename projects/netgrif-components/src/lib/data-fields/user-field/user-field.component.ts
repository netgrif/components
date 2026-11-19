import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {AbstractUserFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-user-field',
    templateUrl: './user-field.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UserFieldComponent extends AbstractUserFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
