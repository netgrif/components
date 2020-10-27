import {Component, Inject, Optional} from '@angular/core';
import {AbstractBooleanFieldComponent, BOOLEAN_VALUE_LABEL_ENABLED} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-boolean-field',
    templateUrl: './boolean-field.component.html',
    styleUrls: ['./boolean-field.component.scss']
})
export class BooleanFieldComponent extends AbstractBooleanFieldComponent {
    valueLabelEnabled: boolean;

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(BOOLEAN_VALUE_LABEL_ENABLED) protected isEnabled: boolean) {
        super(_translate);
        this.valueLabelEnabled = isEnabled;
    }
}
