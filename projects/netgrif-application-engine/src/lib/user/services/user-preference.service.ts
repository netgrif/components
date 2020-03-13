import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';
import {Preferences} from '../models/preferences/preferences';
import {PreferenceFilters} from '../models/preferences/preference-filters';
import {PreferenceHeaders} from '../models/preferences/preference-headers';

@Injectable({
    providedIn: 'root'
})
export class UserPreferenceService {

    private _user: User;

    constructor(
        // private _resourceService: ResourceService
    ) {
    }

    set user(value: User) {
        this._user = value;
    }

    ///// PREFERENCE FILTERS /////

    /**
     * @param viewId - task view viewId
     * @param value - list of filters stringIds
     */
    public saveTaskFilters(viewId: string, value: PreferenceFilters) {
        this._user.preferences.taskFilters[viewId] = value;
        this._savePreferences();
    }

    /**
     * @param viewId - task view viewId
     * @returns list of filters stringIds
     */
    public getTaskFilters(viewId: string): Observable<PreferenceFilters> {
        return of(this._user.preferences.taskFilters[viewId]);
    }


    /**
     * @param viewId - case view viewId
     * @param value - list of filters stringIds
     */
    public saveCaseFilters(viewId: string, value: PreferenceFilters) {
        this._user.preferences.caseFilters[viewId] = value;
        this._savePreferences();
    }

    /**
     * @param viewId - case view viewId
     * @returns list of filters stringIds
     */
    public getCaseFilters(viewId: string): Observable<PreferenceFilters> {
        return of(this._user.preferences.caseFilters[viewId]);
    }


    /**
     * @param viewId - workflow view viewId
     * @param value - list of filters stringIds
     */
    public saveWorkflowFilters(viewId: string, value: PreferenceFilters) {
        this._user.preferences.workflowFilters[viewId] = value;
        this._savePreferences();
    }

    /**
     * @param viewId - workflow view viewId
     * @returns list of filters stringIds
     */
    public getWorkflowFilters(viewId: string): Observable<PreferenceFilters> {
        return of(this._user.preferences.workflowFilters[viewId]);
    }

    ///// PREFERENCE HEADERS /////

    /**
     * @param viewId - task view viewId
     * @param value - list of headers
     */
    public saveTaskHeaders(viewId: string, value: PreferenceHeaders) {
        this._user.preferences.taskHeaders[viewId] = value;
        this._savePreferences();
    }

    /**
     * @param viewId - task view viewId
     * @returns list of filters stringIds
     */
    public getTaskHeaders(viewId: string): Observable<PreferenceHeaders> {
        return of(this._user.preferences.taskHeaders[viewId]);
    }


    /**
     * @param viewId - case view viewId
     * @param value - list of headers
     */
    public saveCaseHeaders(viewId: string, value: PreferenceHeaders) {
        this._user.preferences.caseHeaders[viewId] = value;
        this._savePreferences();
    }

    /**
     * @param viewId - case view viewId
     * @returns list of filters stringIds
     */
    public getCaseHeaders(viewId: string): Observable<PreferenceHeaders> {
        return of(this._user.preferences.caseHeaders[viewId]);
    }


    /**
     * @param viewId - workflow view viewId
     * @param value - list of headers
     */
    public saveWorkflowHeaders(viewId: string, value: PreferenceHeaders) {
        this._user.preferences.workflowHeaders[viewId] = value;
        this._savePreferences();
    }

    /**
     * @param viewId - workflow view viewId
     * @returns list of filters stringIds
     */
    public getWorkflowHeaders(viewId: string): Observable<PreferenceHeaders> {
        return of(this._user.preferences.workflowHeaders[viewId]);
    }



    private _savePreferences() {
        // TODO: Save preferences via resourceService to backend
        // return this._resourceService.savePreferences(this._user.preferences);
    }

    private _loadPreferences(): Observable<Preferences> {
        // TODO: Load preferences via resourceService from backend
        // return this._resourceService.loadPreferences()
        //     .pipe( preferences =>
        //         tap(this._user.preferences = preferences)
        //     );
        return;
    }
}
