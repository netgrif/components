import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CaseResourceService} from '../case-resource.service';
import {ResourceProvider} from '../../resource-provider.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {EventOutcomeMessageResource} from '../../interface/message-resource';

@Injectable({
    providedIn: 'root'
})
export class PublicCaseResourceService extends CaseResourceService {

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super(provider, configService);
    }

    /**
     * Get all case data
     * GET
     * {{baseUrl}}/api/public/case/:id/data
     */
    public getCaseData(caseID: string): Observable<EventOutcomeMessageResource> {
        return this._resourceProvider.get$('public/case/' + caseID + '/data', this.SERVER_URL)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Create new case
     * POST
     * {{baseUrl}}/api/workflow/case
     */
    public createCase(body: object): Observable<EventOutcomeMessageResource> {
        return this._resourceProvider.post$('public/case/', this.SERVER_URL, body)
            .pipe(map(r => this.changeType(r, undefined)));
    }
}
