import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractInternalLinkComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-internal-link',
    templateUrl: './internal-link.component.html',
    styleUrls: ['./internal-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class InternalLinkComponent extends AbstractInternalLinkComponent {
    constructor() {
        super();
    }
}
