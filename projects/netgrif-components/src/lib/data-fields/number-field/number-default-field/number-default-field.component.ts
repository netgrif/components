import {Component, Inject, Optional} from '@angular/core';
import {AbstractDefaultNumberFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-number-default-field',
    templateUrl: './number-default-field.component.html',
    styleUrls: ['./number-default-field.component.scss']
})
export class NumberDefaultFieldComponent extends AbstractDefaultNumberFieldComponent {
    constructor(_translate: TranslateService, @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(_translate, informAboutInvalidData);
    }
}
