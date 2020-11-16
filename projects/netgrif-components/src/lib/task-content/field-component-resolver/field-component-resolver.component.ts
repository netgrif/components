import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AbstractFieldComponentResolverComponent, TaskContentService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-field-component-resolver',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './field-component-resolver.component.html',
    styleUrls: ['./field-component-resolver.component.scss']
})
export class FieldComponentResolverComponent extends AbstractFieldComponentResolverComponent {

    constructor(taskContentService: TaskContentService) {
        super(taskContentService);
    }
}
