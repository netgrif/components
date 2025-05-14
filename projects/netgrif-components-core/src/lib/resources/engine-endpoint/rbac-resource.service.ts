import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ResourceProvider} from '../resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {AbstractResourceService} from '../abstract-endpoint/abstract-resource.service';
import {Role} from "../interface/roles/role";

@Injectable({
    providedIn: 'root'
})
export class RbacResourceService extends AbstractResourceService {

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super('rbac', provider, configService);
    }

    // todo doc
    public findRoleIds(actorId: string): Observable<Set<string>> {
        if (actorId === undefined) {
            return of(new Set<string>())
        }
        return this._resourceProvider.get$('authorization/' + actorId + '/roles', this.SERVER_URL, filter.getRequestBody(),
            filter.getRequestParams()).pipe(map(r => this.changeType(r, undefined)));
    }

    public assignRoles(actorId: string, roleIds: Set<String>): Observable<Array<Role>> {
        if (roleIds === undefined || roleIds.size === 0 || actorId === undefined) {
            return of([])
        }
        // return this._resourceProvider.post$('authorization/' + actorId + '/assign', this.SERVER_URL, body, params)
        //     .pipe(map(r => this.changeType(r, undefined)));
        // todo 2058
        return of([])
    }

    public removeRoles(actorId: string, roleIds: Set<String>): Observable<Array<Role>> {
        if (roleIds === undefined || roleIds.size === 0 || actorId === undefined) {
            return of([])
        }
        // return this._resourceProvider.post$('authorization/' + actorId + '/remove', this.SERVER_URL, body, params)
        //     .pipe(map(r => this.changeType(r, undefined)));
        // todo 2058
        return of([])
    }

}

