import {Component, Inject, Optional} from '@angular/core';
import {AbstractTaskRefFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

@Component({
    selector: 'nc-task-ref-field',
    templateUrl: './task-ref-field.component.html',
    styleUrls: ['./task-ref-field.component.scss']
})
export class TaskRefFieldComponent extends AbstractTaskRefFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

}
