import {Component} from '@angular/core';
import {AbstractBooleanFieldComponent} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-boolean-field',
    templateUrl: './boolean-field.component.html',
    styleUrls: ['./boolean-field.component.scss']
})
export class BooleanFieldComponent extends AbstractBooleanFieldComponent {

    constructor(protected _translate: TranslateService) {
        super(_translate);
    }
}
