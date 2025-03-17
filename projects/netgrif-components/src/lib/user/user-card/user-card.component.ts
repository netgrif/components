import {Component, Injector} from '@angular/core';
import {AbstractUserCardComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
    standalone: false
})
export class UserCardComponent extends AbstractUserCardComponent {

    constructor(protected _injector: Injector) {
        super(_injector);
    }
}
