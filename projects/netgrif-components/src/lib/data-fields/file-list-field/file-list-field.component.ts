import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractFileListFieldComponent,
    NAE_INFORM_ABOUT_INVALID_DATA,
} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-file-list-field',
    templateUrl: './file-list-field.component.html',
    styleUrls: ['./file-list-field.component.scss'],
    standalone: false
})
export class FileListFieldComponent extends AbstractFileListFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super( informAboutInvalidData);
    }
}
