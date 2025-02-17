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
    DynamicNavigationRouteProviderService,
    AccessService,
    ImpersonationUserSelectService,
    ImpersonationService,
    CaseResourceService,
    RedirectService,
    DoubleDrawerNavigationService
} from '@netgrif/components-core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TranslateService} from "@ngx-translate/core";

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

    constructor(_router: Router,
                _activatedRoute: ActivatedRoute,
                _breakpoint: BreakpointObserver,
                _languageService: LanguageService,
                _translateService: TranslateService,
                _userService: UserService,
                _accessService: AccessService,
                _log: LoggerService,
                _config: ConfigurationService,
                _uriService: UriService,
                _caseResourceService: CaseResourceService,
                _impersonationUserSelect: ImpersonationUserSelectService,
                _impersonation: ImpersonationService,
                _dynamicRouteProviderService: DynamicNavigationRouteProviderService,
                _redirectService: RedirectService,
                _navigationService: DoubleDrawerNavigationService) {
        super(_router, _activatedRoute, _breakpoint, _languageService, _translateService, _userService, _accessService,
            _log, _config, _uriService, _caseResourceService, _impersonationUserSelect, _impersonation,
            _dynamicRouteProviderService, _redirectService, _navigationService)
    }

    public toggleSection(section: string): void {
        this.isSectionOpen[section] = !this.isSectionOpen[section];
    }

}
