import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AbstractTextareaFieldComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-textarea-field',
    templateUrl: './textarea-field.component.html',
    styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent extends AbstractTextareaFieldComponent {

    constructor(protected _translate: TranslateService) {
        super(_translate);
    }
}
