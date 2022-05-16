import { Injectable } from '@angular/core';
import {AbstractResourceService} from '../abstract-endpoint/abstract-resource.service';
import {Params, ResourceProvider} from '../resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Observable} from 'rxjs';
import {MessageResource} from '../interface/message-resource';
import {map} from 'rxjs/operators';
import {LdapGroupResponseBody} from '../interface/ldapGroupResponseBody';

@Injectable({
  providedIn: 'root'
})
export class LdapGroupResourceService extends AbstractResourceService {

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super('user', provider, configService);
    }

    /**
     * Search Ldap group
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/ldap/search
     */
    public searchLdapGroups(body: object, params?: Params): Observable<LdapGroupResponseBody> {
        return this._resourceProvider.post$('ldap/search', this.SERVER_URL, body)
            .pipe(map(r => this.changeType(r, undefined)));
    }


    /**
     * Assign role to the ldap group
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/ldap/role/assign
     */
    public assignRolesToLdapGroup(body: object, params?: Params): Observable<MessageResource> {
        return this._resourceProvider.post$('ldap/role/assign', this.SERVER_URL, body, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }


}
