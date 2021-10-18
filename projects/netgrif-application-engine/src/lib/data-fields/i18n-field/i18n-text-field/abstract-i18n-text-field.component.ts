import {Input, OnInit} from '@angular/core';
import {I18nField} from '../models/i18n-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

export abstract class AbstractI18nTextFieldComponent implements OnInit {

    @Input() textI18nField: I18nField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    ngOnInit(): void {
    }
}
