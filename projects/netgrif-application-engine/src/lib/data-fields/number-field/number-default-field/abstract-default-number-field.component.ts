import {Inject, Input, OnInit, Optional} from '@angular/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {AbstractNumberFieldComponent} from '../abstract-number-field.component';
import {TranslateService} from '@ngx-translate/core';
import {FormControl} from '@angular/forms';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../../models/invalid-data-policy-token';

export abstract class AbstractDefaultNumberFieldComponent extends AbstractNumberFieldComponent implements OnInit {

    @Input() showLargeLayout: WrappedBoolean;
    @Input() formControlRef: FormControl;

    constructor(protected _translateService: TranslateService, informAboutInvalidData: boolean | null) {
        super(_translateService, informAboutInvalidData);
    }

    ngOnInit() {
    }
}
