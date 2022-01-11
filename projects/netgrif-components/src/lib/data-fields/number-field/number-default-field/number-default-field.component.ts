import {Component} from '@angular/core';
import {AbstractDefaultNumberFieldComponent} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-number-default-field',
    templateUrl: './number-default-field.component.html',
    styleUrls: ['./number-default-field.component.scss']
})
export class NumberDefaultFieldComponent extends AbstractDefaultNumberFieldComponent {
    constructor(translate: TranslateService) {
        super(translate);
    }
}
