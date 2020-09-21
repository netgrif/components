import {Injectable} from '@angular/core';
import {ResourceProvider} from '../../../resources/resource-provider.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {getResourceAddress} from '../../../resources/resource-utility-functions';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AbstractCustomCardResourceService {
    private SERVER_URL: string;

    protected constructor(protected provider: ResourceProvider,
                          protected _configService: ConfigurationService,
                          protected httpClient: HttpClient) {
        this.SERVER_URL = getResourceAddress('dashboard', this._configService.get().providers.resources);
    }

    public getResource(type: string, jsonQuery): Observable<string> {
        const ret = new Subject<string>();
        let params: HttpParams = new HttpParams();
        params = params.set('type', type);
        this.provider.post$('/dashboard/search', this.SERVER_URL, jsonQuery, params).subscribe(result => {
            ret.next(result as string);
            ret.complete();
        }, error => {
            console.log(error);
        });
        return ret;
    }

}
