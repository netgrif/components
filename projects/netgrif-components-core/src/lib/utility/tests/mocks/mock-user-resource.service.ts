import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Preferences} from '../../../resources/interface/preferences';
import {MessageResource} from '../../../resources/interface/message-resource';
import {UserResource} from '../../../resources/interface/user-resource';

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

    public getLoggedUser(): Observable<UserResource> {
        return of({email: 'mail', id: 'id', name: 'name', surname: 'surname', fullName: 'name surname',
            groups: [], authorities: [], nextGroups: [], processRoles: []});
    }

    // methods not yet mocked by this mock
    public assignAuthority() {
        throw new Error('Method not yet mocked - assignAuthority');
    }

    public assignRoles() {
        throw new Error('Method not yet mocked - assignRoles');
    }

    public getAllAuthorities() {
        throw new Error('Method not yet mocked - getAllAuthorities');
    }

    public getAll() {
        throw new Error('Method not yet mocked - getAll');
    }

    public getAllWithRole() {
        throw new Error('Method not yet mocked - getAllWithRole');
    }

    public getUser() {
        throw new Error('Method not yet mocked - getUser');
    }

    public search() {
        throw new Error('Method not yet mocked - search');
    }

    public updateUser() {
        throw new Error('Method not yet mocked - updateUser');
    }
}
