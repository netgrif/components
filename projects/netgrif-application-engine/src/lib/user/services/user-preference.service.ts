import {Injectable} from '@angular/core';
import {Preferences} from '../models/preferences';
import {UserService} from './user.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserPreferenceService {

    protected _preferences: Preferences;
    protected _preferencesChanged$: Subject<void>;

    constructor(protected _userService: UserService,
                protected _userResourceService: UserResourceService,
                protected _logger: LoggerService,
                protected _snackbar: SnackBarService) {
        this._preferences = this._emptyPreferences();
        this._preferencesChanged$ = new Subject<void>();

        this._userService.user$.subscribe(loggedUser => {
            if (loggedUser.id !== '') {
                this._userResourceService.getPreferences().subscribe(prefs => {
                        this._preferences = prefs;
                        this._preferencesChanged$.next();
                    }
                );
            } else {
                this._preferences = this._emptyPreferences();
                this._preferencesChanged$.next();
            }
        });
    }

    public saveTaskFilters(viewId: string, value: Array<string>): void {
        this._preferences.taskFilters[viewId] = value;
        this._savePreferences();
    }

    public getTaskFilters(viewId: string): Array<string> | undefined {
        return this._preferences.taskFilters[viewId];
    }

    public saveCaseFilters(viewId: string, value: Array<string>): void {
        this._preferences.caseFilters[viewId] = value;
        this._savePreferences();
    }

    public getCaseFilters(viewId: string): Array<string> | undefined {
        return this._preferences.caseFilters[viewId];
    }

    public saveCaseHeaders(viewId: string, value: Array<string>): void {
        this._preferences.caseViewHeaders[viewId] = value;
        this._savePreferences();
    }

    public getCaseHeaders(viewId: string): Array<string> | undefined {
        return this._preferences.caseViewHeaders[viewId];
    }

    public saveLocale(locale: string): void {
        this._preferences.locale = locale;
        this._savePreferences();
    }

    public getLocale(): string {
        return this._preferences.locale;
    }

    public preferencesChanged$(): Observable<void> {
        return this._preferencesChanged$.asObservable();
    }

    protected _savePreferences(): void {
        this._userResourceService.setPreferences(this._preferences).subscribe(resultMessage => {
            if (!!resultMessage.success) {
                // TODO i18n
                this._snackbar.openSuccessSnackBar('User preferences saved successfully');
            } else {
                this._snackbar.openErrorSnackBar('An error occurred while saving user preferences');
                this._logger.error('User preferences failed to save', resultMessage);
            }
        });
    }

    protected _emptyPreferences(): Preferences {
        return {
            caseViewHeaders: {},
            caseFilters: {},
            taskFilters: {}
        };
    }
}
