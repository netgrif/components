import {Injectable, OnDestroy} from '@angular/core';
import {Preferences} from '../../resources/interface/preferences';
import {UserService} from './user.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {debounceTime} from 'rxjs/operators';
import {MessageResource} from '../../resources/public-api';

const DRAWER_DEFAULT_WIDTH = 200;
const DRAWER_DEBOUNCE = 1000;

@Injectable({
    providedIn: 'root'
})
export class UserPreferenceService implements OnDestroy {

    protected _preferences: Preferences;
    protected _preferencesChanged$: Subject<void>;
    protected _sub: Subscription;
    protected _subAnonym: Subscription;
    public _drawerWidthChanged$: Subject<number>;
    protected _anonym: boolean;

    constructor(protected _userService: UserService,
                protected _userResourceService: UserResourceService,
                protected _logger: LoggerService,
                protected _snackbar: SnackBarService,
                protected _translate: TranslateService) {
        this._preferences = this._emptyPreferences();
        this._preferencesChanged$ = new Subject<void>();
        this._drawerWidthChanged$ = new Subject<number>();
        this._anonym = false;

        this._sub = this._userService.user$.subscribe(loggedUser => {
            if (loggedUser && loggedUser.id !== '') {
                this._userResourceService.getPreferences().subscribe(prefs => {
                        this._preferences = this._emptyPreferences();
                        Object.assign(this._preferences, prefs);
                        this._preferencesChanged$.next();
                    }
                );
            } else {
                this._preferences = this._emptyPreferences();
                this._preferencesChanged$.next();
            }
        });

        this._subAnonym = this._userService.anonymousUser$.subscribe(loggedUser => {
            if (loggedUser && loggedUser.id !== '') {
                this._userResourceService.getPublicPreferences().subscribe(prefs => {
                        this._preferences = this._emptyPreferences();
                        Object.assign(this._preferences, prefs);
                        this._preferencesChanged$.next();
                        this._anonym = true;
                    }
                );
            } else {
                this._preferences = this._emptyPreferences();
                this._preferencesChanged$.next();
                this._anonym = false;
            }
        });

        this._drawerWidthChanged$.asObservable().pipe(
            debounceTime(DRAWER_DEBOUNCE)
        ).subscribe(newWidth => {
            this.setDrawerWidth(newWidth);
        });
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
        this._preferencesChanged$.complete();
    }

    public setTaskFilters(viewId: string, value: Array<string>): void {
        this._preferences.taskFilters[viewId] = value;
        this._savePreferences();
    }

    public getTaskFilters(viewId: string): Array<string> | undefined {
        return this._preferences.taskFilters[viewId];
    }

    public setCaseFilters(viewId: string, value: Array<string>): void {
        this._preferences.caseFilters[viewId] = value;
        this._savePreferences();
    }

    public getCaseFilters(viewId: string): Array<string> | undefined {
        return this._preferences.caseFilters[viewId];
    }

    public setHeaders(viewId: string, value: Array<string>): void {
        this._preferences.headers[viewId] = value;
        this._savePreferences();
    }

    public getHeaders(viewId: string): Array<string> | undefined {
        return this._preferences.headers[viewId];
    }

    public setLocale(locale: string): void {
        this._preferences.locale = locale;
        this._savePreferences();
    }

    public getLocale(): string | undefined {
        return this._preferences.locale;
    }

    public setDrawerWidth(drawerWidth: number) {
        this._preferences.drawerWidth = drawerWidth;
        this._savePreferences();
    }

    public getDrawerWidth(): number | undefined {
        return this._preferences.drawerWidth;
    }

    public get preferencesChanged$(): Observable<void> {
        return this._preferencesChanged$.asObservable();
    }

    protected _savePreferences(): void {
        if (!this._anonym) {
            this._userResourceService.setPreferences(this._preferences).subscribe(resultMessage => {
                this.resultMessage(resultMessage);
            });
        } else {
            this._userResourceService.setPublicPreferences(this._preferences).subscribe(resultMessage => {
                this.resultMessage(resultMessage);
            });
        }
    }

    protected resultMessage(resultMessage: MessageResource): void {
        if (typeof resultMessage.success === 'string') {
            this._snackbar.openSuccessSnackBar(this._translate.instant('preferences.snackbar.saveSuccess'));
        } else {
            this._snackbar.openErrorSnackBar(this._translate.instant('preferences.snackbar.saveFailure'));
            this._logger.error('User preferences failed to save', resultMessage);
        }
    }

    protected _emptyPreferences(): Preferences {
        return {
            drawerWidth: DRAWER_DEFAULT_WIDTH,
            headers: {},
            caseFilters: {},
            taskFilters: {}
        };
    }
}
