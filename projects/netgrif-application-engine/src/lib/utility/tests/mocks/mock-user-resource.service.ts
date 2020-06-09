import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Preferences} from '../../../user/models/preferences';
import {MessageResource} from '../../../resources/interface/message-resource';

@Injectable()
export class MockUserResourceService {

    public getPreferences(): Observable<Preferences> {
        return of({
            headers: {},
            caseFilters: {},
            taskFilters: {},
            other: {}
        });
    }

    public setPreferences(): Observable<MessageResource> {
        return of({success: ''});
    }
}
