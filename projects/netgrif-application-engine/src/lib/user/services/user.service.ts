import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import Role from "../models/role";
import {Store} from "@ngrx/store";
import {State} from "../store/reducers/user.reducers";
import {User} from "../models/user";
import Credentials from "../../authentication/models/credentials";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _user: User;

    constructor(private _store: Store<State>,
                // private _authService: AuthenticationService
    ) {
    }

    public login(credentials: Credentials): Observable<any> {
        // TODO: NgRx store
        // this._store.dispatch(loginUser({user: user}));

        // return this._authService.login(credentials)
        //     .pipe((authUser: User) => this._user = authUser );
        return
    }

    public getLoggedUser(): User {
        // TODO: NgRx store
        // return this._store.select(selectLoggedUser)

        return this._user;
    }

    public hasPermision(user: User): boolean {
        return
    }

    public changeRoles(roles: Array<Role>): Observable<any> {
        return
    }

    public hasRole(role: Role): boolean {
        return
    }

    public logout(): void {
        // TODO: NgRx store
        // this._store.dispatch(logoutUser)

        this._user = null
    }

}
