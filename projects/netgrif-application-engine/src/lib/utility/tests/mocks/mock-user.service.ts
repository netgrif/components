import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {User} from '../../../user/models/user';

@Injectable()
export class MockUserService {

    private _userChange$: ReplaySubject<User>;

    constructor() {
        this._userChange$ = new ReplaySubject<User>(1);
    }

    get user$(): Observable<User> {
        return this._userChange$.asObservable();
    }
}
