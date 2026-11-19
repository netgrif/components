import {Component, Inject, ChangeDetectionStrategy, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {
    ConfigurationService,
    LanguageService,
    UriService,
    LoggerService,
    UserService,
    ProcessService,
    SnackBarService,
    AbstractNavigationDoubleDrawerComponent,
    DynamicNavigationRouteProviderService,
    AccessService,
    AppearanceService,
    darkColorScheme$,
    ImpersonationUserSelectService,
    ImpersonationService,
    CaseResourceService,
    RedirectService,
    DoubleDrawerNavigationService,
    NAE_TASK_VIEW_COMPONENT
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/portal";
import {AppearanceDialogComponent} from './appearance-dialog/appearance-dialog.component';

@Component({
    selector: 'nc-navigation-double-drawer',
    templateUrl: './navigation-double-drawer.component.html',
    styleUrls: ['./navigation-double-drawer.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NavigationDoubleDrawerComponent extends AbstractNavigationDoubleDrawerComponent implements OnInit, OnDestroy {

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
                _navigationService: DoubleDrawerNavigationService,
                _processService: ProcessService,
                _snackBarService: SnackBarService,
                _dialog: MatDialog,
                @Inject(NAE_TASK_VIEW_COMPONENT) _taskView: ComponentType<unknown>) {
        super(_router, _activatedRoute, _breakpoint, _languageService, _translateService, _userService, _accessService,
            _log, _config, _uriService, _caseResourceService, _impersonationUserSelect, _impersonation,
            _dynamicRouteProviderService, _redirectService, _navigationService, _processService, _snackBarService, _dialog,
            _taskView);
    }

    public toggleSection(section: string): void {
        this.isSectionOpen[section] = !this.isSectionOpen[section];
    }

    private readonly _appearance = inject(AppearanceService);
    /** the light / dark mode in effect, kept up to date (the template reads it instead of querying it every check) */
    public darkMode = this._appearance.isDarkMode();
    protected _darkModeSub: Subscription = darkColorScheme$().subscribe(dark => this.darkMode = dark);
    private readonly _matDialog = inject(MatDialog);

    public ngOnInit(): void {
        super.ngOnInit();
    }

    public openAppearance(): void {
        this._matDialog.open(AppearanceDialogComponent, { width: '560px' });
    }

    public languages(): Array<string> {
        return this._languageService.getTranslations().map(trans => trans.key);
    }

    public currentLanguage(): string {
        return this._languageService.getLanguage();
    }

    public setLanguage(lang: string): void {
        this._languageService.setLanguage(lang, true);
    }

    /**
     * Dark mode is the user's choice (class on html) or the OS preference.
     */
    public isDarkMode(): boolean {
        return this.darkMode;
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this._darkModeSub.unsubscribe();
    }

    public toggleDarkMode(): void {
        this._appearance.toggleDarkMode();
    }
}
