import {Injectable} from '@angular/core';
import {ResourceProvider} from '../resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AggregationQuery} from '../../dashboard/cards/model/custom-dashboard-model/aggregation-query';
import {AggregationResult} from '../../dashboard/cards/model/custom-dashboard-model/aggregation-result';
import {AbstractResourceService} from '../abstract-endpoint/abstract-resource.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardResourceService extends AbstractResourceService {

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super('dashboard', provider, configService);
    }

    public getDashboardData(type: string, jsonQuery: AggregationQuery): Observable<AggregationResult> {
        let params: HttpParams = new HttpParams();
        params = params.set('type', type);
        return this._resourceProvider.post$<AggregationResult>('/dashboard/search', this.SERVER_URL, jsonQuery, params);
    }
}
