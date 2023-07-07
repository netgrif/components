import {Component, Inject, Input, Optional} from '@angular/core';
import {NumberField} from './models/number-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {TranslateService} from '@ngx-translate/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {NAE_SAVE_DATA_INFORM} from '../models/save-data-inform-token';

@Component({
    selector: 'ncc-abstract-number-field',
    template: ''
})
export abstract class AbstractNumberFieldComponent extends AbstractDataFieldComponent {

    @Input() public dataField: NumberField;

    protected constructor(protected _translate: TranslateService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null,
                          @Optional() @Inject(NAE_SAVE_DATA_INFORM) saveDataInform: boolean | null = false) {
        super(informAboutInvalidData, saveDataInform);
    }

}
