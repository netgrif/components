import {Component} from '@angular/core';

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
