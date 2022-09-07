import {Component, Inject, Input, Optional} from '@angular/core';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {TaskRefField} from './model/task-ref-field';

@Component({
    selector: 'ncc-abstract-task-ref-field',
    template: ''
})
export abstract class AbstractTaskRefFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: TaskRefField;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
