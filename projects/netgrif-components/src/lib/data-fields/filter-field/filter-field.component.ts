import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractFilterFieldComponent,
    NAE_INFORM_ABOUT_INVALID_DATA
} from '@netgrif/components-core';

@Component({
    selector: 'nc-filter-field',
    templateUrl: './filter-field.component.html',
    styleUrls: ['./filter-field.component.scss']
})
export class FilterFieldComponent extends AbstractFilterFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

}
