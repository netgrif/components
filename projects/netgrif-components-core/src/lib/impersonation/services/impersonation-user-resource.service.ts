import {Injectable} from '@angular/core';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {ResourceProvider} from '../../resources/resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Params} from '@angular/router';
import {Observable} from 'rxjs';
import {Page} from '../../resources/interface/page';
import {UserResource} from '../../resources/interface/user-resource';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ImpersonationUserResourceService extends UserResourceService {

    constructor(protected provider: ResourceProvider, protected _configService: ConfigurationService) {
        super(provider, _configService);
    }

    public search(body: object, params?: Params): Observable<Page<UserResource>> {
        return this.provider.post$('/impersonate/search', this.SERVER_URL, {query: (body as any).fulltext}, params)
            .pipe(map((r) => this.getResourcePage<UserResource>(r, 'users')));
    }
}
