import {Component, Injector} from '@angular/core';
import {AbstractCountCard} from '@netgrif/application-engine';


@Component({
    selector: 'nc-count-card',
    templateUrl: './count-card.component.html',
    styleUrls: ['./count-card.component.scss']
})
export class CountCardComponent extends AbstractCountCard {

    constructor(protected _injector: Injector) {
        super(_injector);
    }
}
