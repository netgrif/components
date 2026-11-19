import {Component, Inject, Input, Optional, ChangeDetectionStrategy} from '@angular/core';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {FileListField} from './models/file-list-field';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';

/**
 * @deprecated
 * */
@Component({
    selector: 'ncc-abstract-filelist-field',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractFileListFieldComponent extends AbstractDataFieldComponent {

    @Input() declare public dataField: FileListField;

    @Input() taskId: string;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

}
