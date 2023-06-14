import {
    Component,
    Inject, Input,
    Optional,
} from '@angular/core';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {FileField} from "./models/file-field";

/**
 * @deprecated
 * */
/**
 * Component that is created in the body of the task panel accord on the Petri Net, which must be bind properties.
 */
@Component({
    selector: 'ncc-abstract-file-field',
    template: ''
})
export abstract class AbstractFileFieldComponent extends AbstractDataFieldComponent  {

    @Input() dataField: FileField;

    @Input() taskId: string;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
