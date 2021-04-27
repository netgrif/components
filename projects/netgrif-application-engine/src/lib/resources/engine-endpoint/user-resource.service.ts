import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Params, ResourceProvider} from '../resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {MessageResource} from '../interface/message-resource';
import {Authority} from '../interface/authority';
import {Preferences} from '../interface/preferences';
import {Page} from '../interface/page';
import {GroupsInterface} from '../interface/group';
import {AbstractResourceService} from '../abstract-endpoint/abstract-resource.service';
import {UserResource} from '../interface/user-resource';

@Injectable({
    providedIn: 'root'
})
export class UserResourceService extends AbstractResourceService {

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super('user', provider, configService);
    }

    /**
     * Assign authority to the user
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/{id}/authority/assign
     */
    public assignAuthority(userId: string, body: object, params?: Params): Observable<MessageResource> {
        return this._resourceProvider.post$('user/' + userId + '/authority/assign', this.SERVER_URL, body, params,
            {'Content-Type': 'text/plain'})
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Assign role to the user
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/{id}/role/assign
     */
    public assignRoles(userId: string, body: object, params?: Params): Observable<MessageResource> {
        return this._resourceProvider.post$('user/' + userId + '/role/assign', this.SERVER_URL, body, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Get all authorities of the system
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/authority
     */
    public getAllAuthorities(): Observable<Array<Authority>> {
        return this._resourceProvider.get$('user/authority', this.SERVER_URL)
            .pipe(map(r => this.changeType(r, 'authorities')));
    }

    /**
     * Get all users
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user
     */
    public getAll(params?: Params): Observable<Page<UserResource>> {
        return this._resourceProvider.get$('user', this.SERVER_URL, params)
            .pipe(map(r => this.getResourcePage<UserResource>(r, 'users')));
    }

    /**
     * Get all users with specified roles
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/role
     */
    public getAllWithRole(body: object, params?: Params): Observable<Array<UserResource>> {
        return this._resourceProvider.post$('user/role', this.SERVER_URL, body, params)
            .pipe(map(r => this.changeType(r, 'users')));
    }

    /**
     * Get logged user
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/me
     */
    public getLoggedUser(params?: Params): Observable<UserResource> {
        return this._resourceProvider.get$('user/me', this.SERVER_URL, params).pipe(
                map(r => this.changeType(r, undefined)));
    }

    /**
     * Get logged user
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/me
     */
    public getPublicLoggedUser(params?: Params): Observable<UserResource> {
        return this._resourceProvider.get$('public/user/me', this.SERVER_URL, params).pipe(
            map(r => this.changeType(r, undefined)));
    }

    /**
     * Get user by id
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/{id}
     */
    public getUser(userId: string, params?: Params): Observable<UserResource> {
        return this._resourceProvider.get$('user/' + userId, this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Get user's preferences
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/preferences
     */
    public getPreferences(params?: Params): Observable<Preferences> {
        return this._resourceProvider.get$('user/preferences', this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Set user's preferences
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/preferences
     */
    public setPreferences(body: object, params?: Params): Observable<MessageResource> {
        return this._resourceProvider.post$('user/preferences', this.SERVER_URL, body, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Get user's preferences
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/preferences
     */
    public getPublicPreferences(params?: Params): Observable<Preferences> {
        return this._resourceProvider.get$('public/user/preferences', this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Set user's preferences
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/preferences
     */
    public setPublicPreferences(body: object, params?: Params): Observable<MessageResource> {
        return this._resourceProvider.post$('public/user/preferences', this.SERVER_URL, body, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Generic user search
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/search
     */
    public search(body: object, params?: Params): Observable<Page<UserResource>> {
        return this._resourceProvider.post$('user/search', this.SERVER_URL, body, params)
            .pipe(map(r => this.getResourcePage<UserResource>(r, 'users')));
    }

    /**
     * Update user
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/{id}
     */
    public updateUser(userId: string, body: object, params?: Params): Observable<UserResource> {
        return this._resourceProvider.post$('user/' + userId, this.SERVER_URL, body, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * get all groups
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/group/all
     */
    public getAllGroups(params?: Params): Observable<GroupsInterface> {
        return this._resourceProvider.get$('group/all', this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

}
