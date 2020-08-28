import {Component} from '@angular/core';
import {AbstractInternalLinkComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-internal-link',
    templateUrl: './internal-link.component.html',
    styleUrls: ['./internal-link.component.scss']
})
export class InternalLinkComponent extends AbstractInternalLinkComponent {
    constructor() {
        super();
    }
}
