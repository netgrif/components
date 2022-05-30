import {Component, Inject, Input, Optional} from '@angular/core';
import {DateField} from './models/date-field';
import {AbstractTimeInstanceFieldComponent} from '../time-instance-abstract-field/abstract-time-instance-field.component';
import {TranslateService} from '@ngx-translate/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';

@Component({
    selector: 'ncc-abstract-date-field',
    template: ''
})
export abstract class AbstractDateFieldComponent extends AbstractTimeInstanceFieldComponent {

    @Input() public dataField: DateField;

    protected constructor(protected _translate: TranslateService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(_translate, informAboutInvalidData);
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
