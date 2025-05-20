import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Params, ResourceProvider} from '../resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {MessageResource} from '../interface/message-resource';
import {Preferences} from '../interface/preferences';
import {Page} from '../interface/page';
import {GroupsInterface} from '../interface/group';
import {AbstractResourceService} from '../abstract-endpoint/abstract-resource.service';
import {IdentityResource} from '../interface/identity-resource';

@Injectable({
    providedIn: 'root'
})
export class IdentityResourceService extends AbstractResourceService {

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super('identity', provider, configService);
    }

    /**
     * Get all users
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user
     */
    public getAll(params?: Params): Observable<Page<IdentityResource>> {
        // todo 2058 does not exist
        return this._resourceProvider.get$('user', this.SERVER_URL, params)
            .pipe(map(r => this.getResourcePage<IdentityResource>(r, 'users')));
    }

    /**
     * Get all users with specified roles
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/role
     */
    public getAllWithRole(body: object, params?: Params): Observable<Array<IdentityResource>> {
        // todo 2058 does not exist
        return this._resourceProvider.post$('user/role', this.SERVER_URL, body, params)
            .pipe(map(r => this.changeType(r, 'users')));
    }

    /**
     todo doc
     * Get logged user
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/me
     */
    public getLoggedIdentity(params?: Params): Observable<IdentityResource> {
        return this._resourceProvider.get$('identity/me', this.SERVER_URL, params).pipe(
                map(r => this.changeType(r, undefined)));
    }

    /**
     todo doc
     * Get logged user
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/me
     */
    public getPublicLoggedIdentity(params?: Params): Observable<IdentityResource> {
        return this._resourceProvider.get$('public/identity/me', this.SERVER_URL, params).pipe(
                map(r => this.changeType(r, undefined)));
    }

    /**
     todo doc
     * Get user by id
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/{id}
     */
    public getUser(identityId: string, params?: Params): Observable<IdentityResource> {
        return this._resourceProvider.get$('identity/' + identityId, this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     todo doc
     * Get user's preferences
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/preferences
     */
    public getPreferences(params?: Params): Observable<Preferences> {
        return this._resourceProvider.get$('identity/preferences', this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     todo doc
     * Set user's preferences
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/preferences
     */
    public setPreferences(body: object, params?: Params): Observable<MessageResource> {
        return this._resourceProvider.post$('identity/preferences', this.SERVER_URL, body, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     todo doc
     * Get user's preferences
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/user/preferences
     */
    public getPublicPreferences(params?: Params): Observable<Preferences> {
        return this._resourceProvider.get$('public/identity/preferences', this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     todo doc
     * Set user's preferences
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/preferences
     */
    public setPublicPreferences(body: object, params?: Params): Observable<MessageResource> {
        return this._resourceProvider.post$('public/identity/preferences', this.SERVER_URL, body, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     todo doc
     * Generic user search
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/search
     */
    public search(body: object, params?: Params): Observable<Page<IdentityResource>> {
        // todo 2058 does not exist
        return this._resourceProvider.post$('user/search', this.SERVER_URL, body, params)
            .pipe(map(r => this.getResourcePage<IdentityResource>(r, 'users')));
    }

    /**
     * Update user
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/{id}
     */
    public updateUser(userId: string, body: object, params?: Params): Observable<IdentityResource> {
        // todo 2058 does not exist
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
        // todo 2058 does not exist
        return this._resourceProvider.get$('group/all', this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

}
