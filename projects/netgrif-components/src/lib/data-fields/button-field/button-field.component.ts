import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractButtonFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA, DialogService} from '@netgrif/components-core';

@Component({
    selector: 'nc-button-field',
    templateUrl: './button-field.component.html',
    styleUrls: ['./button-field.component.scss']
})
export class ButtonFieldComponent extends AbstractButtonFieldComponent {

    constructor(translate: TranslateService,
                protected dialogService: DialogService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(translate,  dialogService, informAboutInvalidData);
    }
}
