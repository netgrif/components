import {Component, Inject, Input, Optional, Type, ChangeDetectionStrategy} from '@angular/core';
import {AbstractTaskRefFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-task-ref-field',
    templateUrl: './task-ref-field.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TaskRefFieldComponent extends AbstractTaskRefFieldComponent {

    @Input() taskContentComponentClassReference: Type<any>;

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

}
