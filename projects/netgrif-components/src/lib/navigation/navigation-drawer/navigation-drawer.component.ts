import {Component} from '@angular/core';
import 'hammerjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AbstractNavigationDrawerComponent, LoggerService, UserPreferenceService} from '@netgrif/components-core';

@Component({
    selector: 'nc-navigation-drawer',
    templateUrl: './navigation-drawer.component.html',
    styleUrls: ['./navigation-drawer.component.scss']
})
export class NavigationDrawerComponent extends AbstractNavigationDrawerComponent {

    constructor(protected breakpoint: BreakpointObserver,
                protected _log: LoggerService,
                protected userPreferenceService: UserPreferenceService) {
        super(breakpoint, _log, userPreferenceService);
    }
}
