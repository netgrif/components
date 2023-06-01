import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TextField} from '../models/text-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';
import {ValidationRegistryService} from "../../../validation/service/validation-registry.service";

@Component({
    selector: 'ncc-abstract-password-text-field',
    template: ''
})
export abstract class AbstractPasswordTextFieldComponent extends AbstractTextErrorsComponent {

    @Input() passwordTextField: TextField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    constructor(protected _translate: TranslateService, _validationRegistry: ValidationRegistryService) {
        super(_translate, _validationRegistry);
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.passwordTextField, this.formControlRef);
    }
}
