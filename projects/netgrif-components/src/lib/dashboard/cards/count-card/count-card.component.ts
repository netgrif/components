import {Component, Injector} from '@angular/core';
import {AbstractCountCardComponent} from '@netgrif/components-core';


@Component({
    selector: 'nc-count-card',
    templateUrl: './count-card.component.html',
    styleUrls: ['./count-card.component.scss']
})
export class CountCardComponent extends AbstractCountCardComponent {

    constructor(protected _injector: Injector) {
        super(_injector);
    }
}
