import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {
    AbstractFilterFieldComponent,
    NAE_INFORM_ABOUT_INVALID_DATA
} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-filter-field',
    templateUrl: './filter-field.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FilterFieldComponent extends AbstractFilterFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

}
