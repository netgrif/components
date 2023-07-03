import {Component, HostListener, NgZone} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextareaFieldComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-textarea-field',
    templateUrl: './textarea-field.component.html',
    styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent extends AbstractTextareaFieldComponent {

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander(event) {
        if (this.textAreaField.isFocused()) {
            event.preventDefault();
            event.returnValue = "Data nie su ulozene!";
            return event;
        }
        return true;
    }

    constructor(protected _translate: TranslateService, protected _ngZone: NgZone) {
        super(_translate, _ngZone);
    }
}
