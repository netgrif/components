import {Component, Inject, NgZone, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractTextareaFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TextAreaField
} from '@netgrif/components-core';

@Component({
    selector: 'nc-textarea-field',
    templateUrl: './textarea-field.component.html',
    styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent extends AbstractTextareaFieldComponent {

    constructor(protected _translate: TranslateService, protected _ngZone: NgZone,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>) {
        super(_translate, _ngZone, dataFieldPortalData);
    }
}
