import {Injectable} from '@angular/core';
import {Preferences} from '../../resources/interface/preferences';
import {UserService} from './user.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {Observable, Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class UserPreferenceService {

    protected _preferences: Preferences;
    protected _preferencesChanged$: Subject<void>;

    constructor(protected _userService: UserService,
                protected _userResourceService: UserResourceService,
                protected _logger: LoggerService,
                protected _snackbar: SnackBarService,
                protected _translate: TranslateService) {
        this._preferences = this._emptyPreferences();
        this._preferencesChanged$ = new Subject<void>();

        this._userService.user$.subscribe(loggedUser => {
            if (loggedUser.id !== '') {
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

    public getLocale(): string {
        return this._preferences.locale;
    }

    public get preferencesChanged$(): Observable<void> {
        return this._preferencesChanged$.asObservable();
    }

    protected _savePreferences(): void {
        this._userResourceService.setPreferences(this._preferences).subscribe(resultMessage => {
            if (typeof resultMessage.success === 'string') {
                this._snackbar.openSuccessSnackBar(this._translate.instant('preferences.snackbar.saveSuccess'));
            } else {
                this._snackbar.openErrorSnackBar(this._translate.instant('preferences.snackbar.saveFailure'));
                this._logger.error('User preferences failed to save', resultMessage);
            }
        });
    }

    protected _emptyPreferences(): Preferences {
        return {
            headers: {},
            caseFilters: {},
            taskFilters: {}
        };
    }
}
