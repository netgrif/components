import {Injectable} from '@angular/core';
import {AbstractResourceService} from '../abstract-endpoint/abstract-resource.service';
import {Params, ResourceProvider} from '../resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Observable} from 'rxjs';
import {MessageResource} from '../interface/message-resource';
import {map} from 'rxjs/operators';
import {CreateFilterBody} from '../interface/create-filter-body';
import {FilterType} from '../../filter/models/filter-type';
import {LoggerService} from '../../logger/services/logger.service';
import {Page} from '../interface/page';

@Injectable({
    providedIn: 'root'
})
export class FilterResourceService extends AbstractResourceService {

    constructor(provider: ResourceProvider, configService: ConfigurationService, protected _log: LoggerService) {
        super('filter', provider, configService);
    }

    /**
     * Create new user filter
     *
     * POST
     *
     * {{baseUrl}}/api/filter
     *
     * @param body the request body
     */
    public saveFilter(body: CreateFilterBody): Observable<MessageResource> {
        if (body.type === FilterType.CASE && body.caseFilterBodies === undefined) {
            this._log.error('A case filter save request must define caseFilterBodies!', body);
            throw new Error('A case filter save request must define caseFilterBodies!');
        } else if (body.type === FilterType.TASK && body.taskFilterBodies === undefined) {
            this._log.error('A task filter save request must define taskFilterBodies!', body);
            throw new Error('A task filter save request must define taskFilterBodies!');
        }

        return this._resourceProvider.post$('filter', this.SERVER_URL, body)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Deletes filter with given id
     *
     * DELETE
     *
     * {{baseUrl}}/api/filter/:id
     *
     * @param filterId mongo ID of the filter we want to delete
     */
    public deleteFilter(filterId: string): Observable<MessageResource> {
        return this._resourceProvider.delete$('filter/' + filterId, this.SERVER_URL)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Saved filter search
     *
     * POST
     *
     * {{baseUrl}}/api/filter/search
     *
     * @param searchRequest search query
     * @param params request parameters, that can be used for sorting of results
     */
    public search(searchRequest: object, params?: Params): Observable<Page<object>> {
        return this._resourceProvider.post$('filter/search', this.SERVER_URL, searchRequest, params)
            .pipe(map(r => this.getResourcePage<object>(r, 'filters')));
    }
}
