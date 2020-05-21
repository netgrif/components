import {Component, Input} from '@angular/core';
import {ButtonField} from './models/button-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../translate/language.service';

@Component({
    selector: 'nae-button-field',
    templateUrl: './button-field.component.html',
    styleUrls: ['./button-field.component.scss']
})
export class ButtonFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: ButtonField;

    constructor(private _translate: TranslateService, private _lang: LanguageService) {
        super();
    }

    public getErrorMessage() {
        if (this.formControl.hasError('required')) {
            return this._translate.instant('dataField.validations.required');
        }
    }
}
