import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractNumberFieldComponent,
    NAE_INFORM_ABOUT_INVALID_DATA,
    NAE_SAVE_DATA_INFORM
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-number-field',
    templateUrl: './number-field.component.html',
    styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent extends AbstractNumberFieldComponent {
    constructor(translate: TranslateService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) saveDataInform: boolean | null) {
        super(translate, informAboutInvalidData, saveDataInform);
    }
}
