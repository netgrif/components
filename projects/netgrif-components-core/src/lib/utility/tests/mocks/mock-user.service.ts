import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Identity} from '../../../identity/models/Identity';

@Injectable()
export class MockUserService {

    protected _userChange$: ReplaySubject<Identity>;
    protected _user: Identity;

    constructor() {
        this._userChange$ = new ReplaySubject<Identity>(1);
    }

    get user$(): Observable<Identity> {
        return this._userChange$.asObservable();
    }

    get user() {
        return this._user;
    }

    set user(user: Identity) {
        this._user = user;
    }

    // todo 2058
    // public hasRoleById(roleStringId: string): boolean {
    //     if (!roleStringId || !this._user.roles) {
    //         return false;
    //     }
    //     return this._user.roles.some(r => r.stringId === roleStringId);
    // }
    //
    // public hasRoleByName(roleName: string, netIdentifier: string): boolean {
    //     if (!roleName || !netIdentifier || !this._user.roles) {
    //         return false;
    //     }
    //     return this._user.roles.some(r => r.stringId === roleName && r.netImportId === netIdentifier);
    // }
    //
    // hasAuthority(): boolean {
    //     return true;
    // }

    public isUserEmpty(user: Identity): boolean {
        return false;
        // return !user || (!user.id && user.roles.length === 0);
    }

    public isCurrentUserEmpty(): boolean {
        return this.isUserEmpty(this.user)
    }

}
