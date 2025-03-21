import {Component, Inject, Input, Optional, Type} from '@angular/core';
import {AbstractTaskRefFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-task-ref-field',
    templateUrl: './task-ref-field.component.html',
    styleUrls: ['./task-ref-field.component.scss']
})
export class TaskRefFieldComponent extends AbstractTaskRefFieldComponent {

    @Input() taskContentComponentClassReference: Type<any>;

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

}
