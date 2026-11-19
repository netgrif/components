import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractNavigationRailComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-navigation-rail',
    templateUrl: './navigation-rail.component.html',
    styleUrls: ['./navigation-rail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NavigationRailComponent extends AbstractNavigationRailComponent {
    constructor() {
        super();
    }
}
