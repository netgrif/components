import {
    Component,
    Inject,
    Input,
    Optional,
} from '@angular/core';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {FileListField} from './models/file-list-field';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';


@Component({
    selector: 'ncc-abstract-filelist-field',
    template: ''
})
export abstract class AbstractFileListFieldComponent extends AbstractDataFieldComponent {

    @Input() public dataField: FileListField;

    @Input() taskId: string;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
