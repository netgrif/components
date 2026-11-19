import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {AbstractEnumerationFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-enumeration-field',
    templateUrl: './enumeration-field.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EnumerationFieldComponent extends AbstractEnumerationFieldComponent {
    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
