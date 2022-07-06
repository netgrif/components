import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {
    ConfigurationService,
    LanguageService,
    UriService,
    LoggerService,
    UserService,
    AbstractNavigationDoubleDrawerComponent,
    DynamicNavigationRouteProviderService
} from '@netgrif/components-core';

@Component({
  selector: 'nc-navigation-double-drawer',
  templateUrl: './navigation-double-drawer.component.html',
  styleUrls: ['./navigation-double-drawer.component.scss']
})
export class NavigationDoubleDrawerComponent extends AbstractNavigationDoubleDrawerComponent {

    constructor(protected _router: Router,
                protected _breakpoint: BreakpointObserver,
                protected _languageService: LanguageService,
                protected _userService: UserService,
                protected _log: LoggerService,
                protected _config: ConfigurationService,
                protected _uriService: UriService,
                protected _dynamicRouteProviderService: DynamicNavigationRouteProviderService) {
        super(_router, _breakpoint, _languageService, _userService, _log, _config, _uriService,
            _dynamicRouteProviderService)
    }

}
