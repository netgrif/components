import {Filter} from '../../../filter/models/filter';
import {Params} from '../../../resources/resource-provider.service';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class MockCaseResourceService {

    public searchCases(filter: Filter, params?: Params): Observable<undefined> {
        return of(undefined);
    }
}
