import {Component, Inject, Optional} from '@angular/core';
import {AbstractNumberFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-number-field',
    templateUrl: './number-field.component.html',
    styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent extends AbstractNumberFieldComponent {
    constructor(translate: TranslateService) {
        super(translate);
    }

    resolveComponent(): string {
        if (this.dataField.component !== undefined) {
            return this.dataField.component.name;
        } else {
            return 'default';
        }
    }
}
