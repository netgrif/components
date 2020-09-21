import {Component} from '@angular/core';
import 'hammerjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AbstractNavigationDrawerComponent, LoggerService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-navigation-drawer',
    templateUrl: './navigation-drawer.component.html',
    styleUrls: ['./navigation-drawer.component.scss']
})
export class NavigationDrawerComponent extends AbstractNavigationDrawerComponent {

    constructor(protected breakpoint: BreakpointObserver, protected _log: LoggerService) {
        super(breakpoint, _log);
    }
}
