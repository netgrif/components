import {Injectable} from '@angular/core';
import {IdentityResourceService} from '../../resources/engine-endpoint/identity-resource.service';
import {ResourceProvider} from '../../resources/resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Params} from '@angular/router';
import {Observable} from 'rxjs';
import {Page} from '../../resources/interface/page';
import {IdentityResource} from '../../resources/interface/identity-resource';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ImpersonationUserResourceService extends IdentityResourceService {

    protected _IMPERSONATION_SERVER_URL: string;

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super(provider, configService);
        this._IMPERSONATION_SERVER_URL = this.getResourceAddress('impersonation');
    }

    public search(body: {fulltext: string}, params?: Params): Observable<Page<IdentityResource>> {
        return this._resourceProvider.post$('/impersonate/search', this._IMPERSONATION_SERVER_URL, {query: body.fulltext}, params)
            .pipe(map((r) => this.getResourcePage<IdentityResource>(r, 'users')));
    }
}
