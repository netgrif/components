import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Preferences} from '../models/preferences';
import {UserService} from './user.service';
import {map} from 'rxjs/operators';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';

@Injectable({
    providedIn: 'root'
})
export class UserPreferenceService {

    protected _preferences$: BehaviorSubject<Preferences>;

    protected _caseViewHeaders$: Observable<Preferences['caseViewHeaders']>;
    protected _caseFilters$: Observable<Preferences['caseFilters']>;
    protected _taskFilters$: Observable<Preferences['taskFilters']>;

    constructor(protected _userService: UserService,
                protected _userResourceService: UserResourceService,
                protected _logger: LoggerService,
                protected _snackbar: SnackBarService) {
        this._preferences$ = new BehaviorSubject<Preferences>(this._emptyPreferences());

        this._userService.user$.subscribe(loggedUser => {
            if (loggedUser.id !== '') {
                this._userResourceService.getPreferences().subscribe(
                    prefs => this._preferences$.next(prefs)
                );
            } else {
                this._preferences$.next(this._emptyPreferences());
            }
        });

        this._caseViewHeaders$ = this._preferences$.pipe(map(prefs => prefs.caseViewHeaders));
        this._caseFilters$ = this._preferences$.pipe(map(prefs => prefs.caseFilters));
        this._taskFilters$ = this._preferences$.pipe(map(prefs => prefs.taskFilters));
    }

    public saveTaskFilters(viewId: string, value: Array<string>): void {
        const prefs = this._preferences$.getValue();
        prefs.taskFilters[viewId] = value;
        this._preferences$.next(prefs);
        this._savePreferences();
    }

    public getTaskFilters$(viewId: string): Observable<Preferences['taskFilters']['']> {
        return this._taskFilters$.pipe(map(taskFilterPrefs => taskFilterPrefs[viewId]));
    }

    public saveCaseFilters(viewId: string, value: Array<string>): void {
        const prefs = this._preferences$.getValue();
        prefs.caseFilters[viewId] = value;
        this._preferences$.next(prefs);
        this._savePreferences();
    }

    public getCaseFilters$(viewId: string): Observable<Preferences['caseFilters']['']> {
        return this._caseFilters$.pipe(map(caseFilterPrefs => caseFilterPrefs[viewId]));
    }

    public saveCaseHeaders(viewId: string, value: Array<string>): void {
        const prefs = this._preferences$.getValue();
        prefs.caseViewHeaders[viewId] = value;
        this._preferences$.next(prefs);
        this._savePreferences();
    }

    public getCaseHeaders$(viewId: string): Observable<Preferences['caseViewHeaders']['']> {
        return this._caseViewHeaders$.pipe(map(caseHeaderPrefs => caseHeaderPrefs[viewId]));
    }

    public saveLocale(locale: string): void {
        const prefs = this._preferences$.getValue();
        prefs.locale = locale;
        this._preferences$.next(prefs);
        this._savePreferences();
    }

    public getLocale$(): Observable<Preferences['locale']> {
        return this._preferences$.pipe(map(prefs => prefs.locale));
    }

    protected _savePreferences(): void {
        this._userResourceService.setPreferences(this._preferences$.getValue()).subscribe(resultMessage => {
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
