import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TextField} from '../models/text-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';

@Component({
    selector: 'ncc-abstract-simple-text-field',
    template: ''
})
export abstract class AbstractSimpleTextFieldComponent extends AbstractTextErrorsComponent {

    @Input() textField: TextField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    constructor(protected _translate: TranslateService) {
        super(_translate);
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.textField, this.formControlRef);
    }
}
