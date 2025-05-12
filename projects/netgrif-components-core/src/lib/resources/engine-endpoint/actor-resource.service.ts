import {Injectable} from "@angular/core";
import {AbstractResourceService} from '../abstract-endpoint/abstract-resource.service';
import {ResourceProvider} from "../resource-provider.service";
import {ConfigurationService} from "../../configuration/configuration.service";
import {MessageResource} from "../interface/message-resource";

@Injectable({
    providedIn: 'root'
})
export class ActorResourceService extends AbstractResourceService {

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super('actor', provider, configService);
    }

    /**
     * todo doc
     * Assign role to the user
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/user/{id}/role/assign
     */
    public assignRoles(actorId: string, body: object, params?: Params): Observable<MessageResource> {
        return this._resourceProvider.post$('authorization/' + actorId + '/assign', this.SERVER_URL, body, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * todo doc
     */
    public removeRoles(actorId: string, body: object, params?: Params): Observable<MessageResource> {
        return this._resourceProvider.post$('authorization/' + actorId + '/remove', this.SERVER_URL, body, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }
}
