import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {AbstractNumberFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-number-field',
    templateUrl: './number-field.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NumberFieldComponent extends AbstractNumberFieldComponent {
    constructor(translate: TranslateService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(translate, informAboutInvalidData);
    }
}
