import {Component} from '@angular/core';
import {AbstractInternalLinkComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-internal-link',
    templateUrl: './internal-link.component.html',
    styleUrls: ['./internal-link.component.scss'],
    standalone: false
})
export class InternalLinkComponent extends AbstractInternalLinkComponent {
    constructor() {
        super();
    }
}
