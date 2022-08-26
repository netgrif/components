import {Component, Inject, Input, Optional} from '@angular/core';
import {DateTimeField} from './models/date-time-field';
import {AbstractTimeInstanceFieldComponent} from '../time-instance-abstract-field/abstract-time-instance-field.component';
import {TranslateService} from '@ngx-translate/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';

@Component({
    selector: 'ncc-abstract-date-time-field',
    template: ''
})
export abstract class AbstractDateTimeFieldComponent extends AbstractTimeInstanceFieldComponent {

    @Input() public dataField: DateTimeField;

    protected constructor(protected _translate: TranslateService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(_translate, informAboutInvalidData);
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
