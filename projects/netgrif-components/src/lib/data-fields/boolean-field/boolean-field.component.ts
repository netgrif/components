import {Component, Inject, Optional} from '@angular/core';
import {AbstractBooleanFieldComponent, BOOLEAN_VALUE_LABEL_ENABLED, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-boolean-field',
    templateUrl: './boolean-field.component.html',
    styleUrls: ['./boolean-field.component.scss']
})
export class BooleanFieldComponent extends AbstractBooleanFieldComponent {
    valueLabelEnabled: boolean;

    constructor(translate: TranslateService,
                @Optional() @Inject(BOOLEAN_VALUE_LABEL_ENABLED) protected isEnabled: boolean,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(translate, informAboutInvalidData);
        this.valueLabelEnabled = isEnabled;
    }
}
