import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Params, ResourceProvider} from '../resource-provider.service';
import {changeType, getResourceAddress} from '../resource-utility-functions';
import {ConfigurationService} from '../../configuration/configuration.service';
import {MessageResource} from '../interface/message-resource';
import {User} from '../interface/user';
import {Authority} from '../interface/authority';
import {Preferences} from '../../user/models/preferences';

@Injectable({
    providedIn: 'root'
})
export class UserResourceService {
    /**
     * @ignore
     */
    private SERVER_URL: string;

    /**
     * @ignore
     */
    protected constructor(protected provider: ResourceProvider, protected _configService: ConfigurationService) {
        this.SERVER_URL = getResourceAddress('user', this._configService.get().providers.resources);
    }

    /**
     * Assign authority to the user
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/{id}/authority/assign
     */
    public assignAuthority(userId: string, body: object, params?: Params): Observable<MessageResource> {
        return this.provider.post$('user/' + userId + '/authority/assign', this.SERVER_URL, body, params)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Assign role to the user
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/{id}/role/assign
     */
    public assignRoles(userId: string, body: object, params?: Params): Observable<MessageResource> {
        return this.provider.post$('user/' + userId + '/role/assign', this.SERVER_URL, body, params)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get all authorities of the system
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/authority
     */
    public getAllAuthorities(): Observable<Array<Authority>> {
        return this.provider.get$('user/authority', this.SERVER_URL)
            .pipe(map(r => changeType(r, 'authorities')));
    }

    /**
     * Get all users
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user
     */
    public getAll(params?: Params): Observable<Array<User>> {
        return this.provider.get$('user', this.SERVER_URL, params)
            .pipe(map(r => changeType(r, 'users')));
    }

    /**
     * Get all users with specified roles
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/role
     */
    public getAllWithRole(body: object, params?: Params): Observable<Array<User>> {
        return this.provider.post$('user/role', this.SERVER_URL, body, params)
            .pipe(map(r => changeType(r, 'users')));
    }

    /**
     * Get logged user
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/me
     */
    public getLoggedUser(params?: Params): Observable<User> {
        return this.provider.get$('user/me', this.SERVER_URL, params)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get user by id
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/{id}
     */
    public getUser(userId: string, params?: Params): Observable<User> {
        return this.provider.get$('user/' + userId, this.SERVER_URL, params)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get user's preferences
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/preferences
     */
    public getPreferences(params?: Params): Observable<Preferences> {
        return this.provider.get$('user/preferences', this.SERVER_URL, params)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Set user's preferences
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/preferences
     */
    public setPreferences(body: object, params?: Params): Observable<MessageResource> {
        return this.provider.post$('user/preferences', this.SERVER_URL, body, params)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Generic user search
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/search
     */
    public search(body: object, params?: Params): Observable<Array<User>> {
        return this.provider.post$('user/search', this.SERVER_URL, body, params)
            .pipe(map(r => changeType(r, 'users')));
    }

    /**
     * Update user
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/{id}
     */
    public updateUser(userId: string, body: object, params?: Params): Observable<User> {
        return this.provider.post$('user/' + userId, this.SERVER_URL, body, params)
            .pipe(map(r => changeType(r, undefined)));
    }

}
