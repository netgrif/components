import { Component, Inject, Optional, ChangeDetectionStrategy } from '@angular/core';
import {
    AbstractUserListFieldComponent,
    NAE_INFORM_ABOUT_INVALID_DATA,
} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
  selector: 'nc-user-list-field',
  templateUrl: './user-list-field.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UserListFieldComponent extends AbstractUserListFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
