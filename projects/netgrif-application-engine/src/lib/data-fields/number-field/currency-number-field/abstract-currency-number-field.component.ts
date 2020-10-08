import {Input, OnInit} from '@angular/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TranslateService} from '@ngx-translate/core';
import {AbstractNumberFieldComponent} from '../abstract-number-field.component';
import {FormControl} from '@angular/forms';

export abstract class AbstractCurrencyNumberFieldComponent extends AbstractNumberFieldComponent implements OnInit {
    @Input() showLargeLayout: WrappedBoolean;
    @Input() formControlRef: FormControl;

    constructor(private _translateService: TranslateService) {
        super(_translateService);
    }
}
