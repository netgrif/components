import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractButtonFieldComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-button-field',
    templateUrl: './button-field.component.html',
    styleUrls: ['./button-field.component.scss']
})
export class ButtonFieldComponent extends AbstractButtonFieldComponent {

    constructor(protected _translate: TranslateService) {
        super(_translate);
    }
}
