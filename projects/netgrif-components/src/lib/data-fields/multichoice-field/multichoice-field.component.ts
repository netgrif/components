import {Component, Inject, Optional} from '@angular/core';
import {AbstractMultichoiceFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-multichoice-field',
    templateUrl: './multichoice-field.component.html',
    styleUrls: ['./multichoice-field.component.scss']
})
export class MultichoiceFieldComponent extends AbstractMultichoiceFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
