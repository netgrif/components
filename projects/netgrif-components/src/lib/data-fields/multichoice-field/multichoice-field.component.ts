import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {AbstractMultichoiceFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-multichoice-field',
    templateUrl: './multichoice-field.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MultichoiceFieldComponent extends AbstractMultichoiceFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
