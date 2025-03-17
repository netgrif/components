import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractFileFieldComponent,
    NAE_INFORM_ABOUT_INVALID_DATA,
} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss'],
    standalone: false
})
export class FileFieldComponent extends AbstractFileFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}

