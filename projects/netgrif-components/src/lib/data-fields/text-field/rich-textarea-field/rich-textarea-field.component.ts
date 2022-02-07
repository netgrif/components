import {Component} from '@angular/core';
import {AbstractRichTextareaFieldComponent} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-rich-textarea-field',
    templateUrl: './rich-textarea-field.component.html',
    styleUrls: ['./rich-textarea-field.component.scss']
})
export class RichTextareaFieldComponent extends AbstractRichTextareaFieldComponent {
    constructor(protected _translate: TranslateService) {
        super(_translate);
    }
}
