import { Injectable } from '@angular/core';
import { AbstractResourceService } from '../../resources/abstract-endpoint/abstract-resource.service';
import { ResourceProvider } from '../../resources/resource-provider.service';
import { ConfigurationService } from '../../configuration/configuration.service';
import { UriNodeResource } from '../model/uri-resource';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Service for accessing backend resource to resolve URI objects
 * */
@Injectable({
    providedIn: 'root'
})
export class UriResourceService extends AbstractResourceService {

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super('user', provider, configService);
    }

    public getByLevel(level: number): Observable<Array<UriNodeResource>> {
        return this._resourceProvider.get$('uri/level/' + level, this.SERVER_URL).pipe(
            map(r => this.changeType(r, 'uriNodes')));
    }

    public getNodesByParent(parentId: string): Observable<Array<UriNodeResource>> {
        return this._resourceProvider.get$('uri/parent/' + parentId, this.SERVER_URL).pipe(
            map(r => this.changeType(r, 'uriNodes')));
    }
}
