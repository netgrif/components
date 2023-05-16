import {Component, Input, Type} from '@angular/core';
import {AbstractFieldComponentResolverComponent, TaskContentService} from '@netgrif/components-core';

@Component({
    selector: 'nc-field-component-resolver',
    templateUrl: './field-component-resolver.component.html',
    styleUrls: ['./field-component-resolver.component.scss']
})
export class FieldComponentResolverComponent extends AbstractFieldComponentResolverComponent {

    @Input() taskContentComponentClassReference: Type<any>;

    constructor(taskContentService: TaskContentService) {
        super(taskContentService);
    }
}
