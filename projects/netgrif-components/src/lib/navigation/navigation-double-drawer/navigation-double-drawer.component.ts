import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'nc-navigation-double-drawer',
    templateUrl: './navigation-double-drawer.component.html',
    styleUrls: ['./navigation-double-drawer.component.scss'],
    animations: [
        trigger('sectionExpansion', [
            state('expanded, void', style({
                height: '*',
                visibility: 'visible'
            })),
            state('collapsed', style({
                height: '0px',
                visibility: 'hidden'
            })),
            transition('expanded <=> collapsed, void => expanded', [
                animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
            ])
        ]),
        trigger('indicatorRotate', [
            state('expanded, void', style({
                transform: 'rotate(180deg)'
            })),
            state('collapsed', style({
                transform: 'rotate(0deg)'
            })),
            transition('expanded <=> collapsed, void => expanded', [
                animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
            ])
        ])
    ]
})
export class NavigationDoubleDrawerComponent extends AbstractNavigationDoubleDrawerComponent {

    public isSectionOpen = {
        folders: true,
        views: true
    };

    constructor(protected _router: Router,
                protected _activatedRoute: ActivatedRoute,
                protected _breakpoint: BreakpointObserver,
                protected _languageService: LanguageService,
                protected _userService: UserService,
                protected _log: LoggerService,
                protected _config: ConfigurationService,
                protected _uriService: UriService,
                protected _dynamicRouteProviderService: DynamicNavigationRouteProviderService) {
        super(_router, _activatedRoute, _breakpoint, _languageService, _userService, _log, _config, _uriService,
            _dynamicRouteProviderService)
    }

    public toggleSection(section: string): void {
        this.isSectionOpen[section] = !this.isSectionOpen[section];
    }

}
