import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';
import {TextAreaField} from '../models/text-area-field';
import {ValidationRegistryService} from "../../../validation/service/validation-registry.service";

@Component({
    selector: 'ncc-abstract-rich-text-field',
    template: ''
})
export abstract class AbstractRichTextareaFieldComponent extends AbstractTextErrorsComponent {

    @Input() textAreaField: TextAreaField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    // TODO BUG: update on blur dont working, switch back to update on ngModel

    constructor(protected _translate: TranslateService, _validationRegistry: ValidationRegistryService) {
        super(_translate, _validationRegistry);
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.textAreaField, this.formControlRef);
    }
}
