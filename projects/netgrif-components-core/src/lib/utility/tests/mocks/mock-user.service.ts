import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {User} from '../../../user/models/user';

@Injectable()
export class MockUserService {

    protected _userChange$: ReplaySubject<User>;
    protected _user: User;

    constructor() {
        this._userChange$ = new ReplaySubject<User>(1);
    }

    get user$(): Observable<User> {
        return this._userChange$.asObservable();
    }

    get user() {
        return this._user;
    }

    set user(user: User) {
        this._user = user;
    }

    public hasRoleById(roleStringId: string): boolean {
        if (!roleStringId || !this._user.roles) {
            return false;
        }
        return this._user.roles.some(r => r.stringId === roleStringId);
    }

    public hasRoleByName(roleName: string, netIdentifier: string): boolean {
        if (!roleName || !netIdentifier || !this._user.roles) {
            return false;
        }
        return this._user.roles.some(r => r.stringId === roleName && r.netImportId === netIdentifier);
    }

    hasAuthority(): boolean {
        return true;
    }
}
