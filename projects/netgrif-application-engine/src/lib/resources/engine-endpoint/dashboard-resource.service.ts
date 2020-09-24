import {Injectable} from '@angular/core';
import {ResourceProvider} from '../resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {getResourceAddress} from '../resource-utility-functions';
import {HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {AggregationQuery} from '../../dashboard/cards/model/custom-dashboard-model/aggregation-query';
import {map} from 'rxjs/operators';
import {AggregationResult} from '../../dashboard/cards/model/custom-dashboard-model/aggregation-result';

@Injectable()
export class DashboardResourceService {
    private SERVER_URL: string;

    public constructor(protected provider: ResourceProvider,
                       protected _configService: ConfigurationService) {
        this.SERVER_URL = getResourceAddress('dashboard', this._configService.get().providers.resources);
    }

    public getDashboardData(type: string, jsonQuery: AggregationQuery): Observable<AggregationResult> {
        let params: HttpParams = new HttpParams();
        params = params.set('type', type);
        return this.provider.post$<AggregationResult>('/dashboard/search', this.SERVER_URL, jsonQuery, params);
    }
}
