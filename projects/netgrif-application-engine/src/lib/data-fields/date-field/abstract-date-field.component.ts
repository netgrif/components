import {Input} from '@angular/core';
import {DateField} from './models/date-field';
import {AbstractTimeInstanceFieldComponent} from '../time-instance-abstract-field/abstract-time-instance-field.component';
import {TranslateService} from '@ngx-translate/core';

export abstract class AbstractDateFieldComponent extends AbstractTimeInstanceFieldComponent {

    @Input() public dataField: DateField;

    constructor(protected _translate: TranslateService) {
        super(_translate);
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
