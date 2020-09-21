import {Component} from '@angular/core';
import {AbstractSimpleTextFieldComponent} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-simple-text-field',
    templateUrl: './simple-text-field.component.html',
    styleUrls: ['./simple-text-field.component.scss']
})
export class SimpleTextFieldComponent extends AbstractSimpleTextFieldComponent {
    constructor(protected _translate: TranslateService) {
        super(_translate);
    }
}
