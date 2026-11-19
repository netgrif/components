import {Component, Injector, ChangeDetectionStrategy} from '@angular/core';
import {AbstractCountCardComponent} from '@netgrif/components-core';


@Component({
    selector: 'nc-count-card',
    templateUrl: './count-card.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CountCardComponent extends AbstractCountCardComponent {

    constructor(protected _injector: Injector) {
        super(_injector);
    }
}
