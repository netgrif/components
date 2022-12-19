import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CaseSearchRequestBody} from '../../../filter/models/case-search-request-body';
import {Filter} from '../../../filter/models/filter';
import {Case} from '../../../resources/interface/case';
import {Page} from '../../../resources/interface/page';
import {Params} from '../../../resources/resource-provider.service';

@Injectable()
export class MockCaseResourceService {

    public searchCases(filter: Filter, params?: Params): Observable<Page<Case>> {
        if ((filter.getRequestBody() as CaseSearchRequestBody).uriNodeId) {
            return of({
                content: [
                    {
                        lastModified: [2022, 11, 28],
                        visualId: 'TST-123548',
                        petriNetObjectId: undefined,
                        processIdentifier: 'test-process',
                        title: 'test case',
                        color: 'black',
                        creationDate: [2022, 11, 28],
                        immediateData: [{
                            stringId: 'objectid',
                            type: 'text',
                        }],
                        author: {
                            email: 'test@example.com',
                            fullName: 'Test',
                        },
                        resetArcTokens: {},
                        stringId: 'objectid',
                        petriNetId: 'objectid',
                        permissions: {
                            'objectid': {},
                        },
                    },
                ],
                pagination: {
                    totalElements: 1,
                    number: 0,
                    size: 1,
                    totalPages: 1,
                },
            });
        }
        return of(undefined);
    }
}
