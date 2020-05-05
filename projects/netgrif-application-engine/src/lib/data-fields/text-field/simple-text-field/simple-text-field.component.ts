import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TextField} from '../models/text-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {AbstractTextFieldComponent} from '../abstract-text-field.component';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../translate/language.service';

@Component({
    selector: 'nae-simple-text-field',
    templateUrl: './simple-text-field.component.html',
    styleUrls: ['./simple-text-field.component.scss']
})
export class SimpleTextFieldComponent extends AbstractTextFieldComponent {

    @Input() textField: TextField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    constructor(protected _translate: TranslateService, private _lang: LanguageService) {
        super(_translate);
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.textField, this.formControlRef);
    }
}
