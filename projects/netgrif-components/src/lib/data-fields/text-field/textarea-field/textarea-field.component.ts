import {Component, NgZone} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextareaFieldComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-textarea-field',
    templateUrl: './textarea-field.component.html',
    styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent extends AbstractTextareaFieldComponent {

    constructor(protected _translate: TranslateService, protected _ngZone: NgZone) {
        super(_translate, _ngZone);
    }
}
