import {Component, Inject, Optional} from '@angular/core';
import {AbstractNumberFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-number-field',
    templateUrl: './number-field.component.html',
    styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent extends AbstractNumberFieldComponent {
    constructor(translate: TranslateService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(translate, informAboutInvalidData);
    }
}
