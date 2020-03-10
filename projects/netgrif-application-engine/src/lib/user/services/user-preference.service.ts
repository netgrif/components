import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {Preferences} from '../models/preferences/preferences';

@Injectable({
    providedIn: 'root'
})
export class UserPreferenceService {

    private _user : User;

    constructor(
                // private _resourceService: ResourceService
    ) {
    }

    set user(value: User) {
        this._user = value;
    }

    /**
     * @param key - task view viewId
     * @param value - list of filters stringIds
     */
    public saveTaskFilters(key, value) {
        this._user.preferences.taskFilters[key] = value;
        this.savePreferences();
    }

    /**
     * @param key - task view viewId
     * @returns list of filters stringIds
     */
    public getTaskFilters(key) {
        return this._user.preferences.taskFilters[key];
    }

    /**
     * @param key - case view viewId
     * @param value - list of filters stringIds
     */
    public saveCaseFilters(key, value) {
        this._user.preferences.caseFilters[key] = value;
        this.savePreferences();
    }

    /**
     * @param key - case view viewId
     * @returns list of filters stringIds
     */
    public getCaseFilters(key) {
        return this._user.preferences.caseFilters[key];
    }

    /**
     * @param key - case view viewId
     * @param value - list of headers
     */
    public saveCaseHeaders(key, value) {
        this._user.preferences.caseHeaders[key] = value;
        this.savePreferences();
    }

    public getCaseHeaders(key) {
        return this._user.preferences.caseHeaders[key];
    }

    public savePreferences() {
        // return this._resourceService.savePreferences();
    }

    public loadPreferences(): Observable<Preferences> {
        // return this._resourceService.loadPreferences();
        return
    }
}
