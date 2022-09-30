import {Component, Inject, Input, Optional} from '@angular/core';
import {DateTimeField} from '../models/date-time-field';
import {AbstractTimeInstanceFieldComponent} from '../../time-instance-abstract-field/abstract-time-instance-field.component';
import {TranslateService} from '@ngx-translate/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../../models/invalid-data-policy-token';
import { WrappedBoolean } from '../../data-field-template/models/wrapped-boolean';
import {
    AbstractSimpleDateTimeFieldComponent
} from '../simple-date-time-field/abstract-simple-date-time-field.component';

@Component({
    selector: 'ncc-abstract-date-time-field',
    template: ''
})
export abstract class AbstractZonedDateTimeFieldComponent extends AbstractSimpleDateTimeFieldComponent {

    public timeZone: string;

    protected constructor(protected _translate: TranslateService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(_translate, informAboutInvalidData);
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
