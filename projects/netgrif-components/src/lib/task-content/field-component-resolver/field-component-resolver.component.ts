import {Component, Inject, Input, Optional, Type} from '@angular/core';
import {
    AbstractFieldComponentResolverComponent,
    NAE_INFORM_ABOUT_INVALID_DATA,
    TaskContentService
} from '@netgrif/components-core';

@Component({
    selector: 'nc-field-component-resolver',
    templateUrl: './field-component-resolver.component.html',
    styleUrls: ['./field-component-resolver.component.scss']
})
export class FieldComponentResolverComponent extends AbstractFieldComponentResolverComponent {

    @Input() taskContentComponentClassReference: Type<any>;

    constructor(taskContentService: TaskContentService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) _informAboutInvalidData: boolean | null) {
        super(taskContentService, _informAboutInvalidData);
    }
}
