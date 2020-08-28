import {Input} from '@angular/core';
import {DateTimeField} from './models/date-time-field';
import {AbstractTimeInstanceFieldComponent} from '../time-instance-abstract-field/abstract-time-instance-field.component';
import {TranslateService} from '@ngx-translate/core';

export abstract class AbstractDateTimeFieldComponent extends AbstractTimeInstanceFieldComponent {

    @Input() public dataField: DateTimeField;

    constructor(protected _translate: TranslateService) {
        super(_translate);
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
