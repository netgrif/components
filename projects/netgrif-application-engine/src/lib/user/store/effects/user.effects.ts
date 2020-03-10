import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {UserService} from "../../services/user.service";
import {logoutUser, loginUser, loginFailure} from "../actions/user.actions";
import Credentials from "../../../authentication/models/credentials";

@Injectable()
export class UserEffects {

    constructor(private _actions$: Actions, private _userService: UserService) {
    }

    // loginUser$ = createEffect(() => this._actions$
    //     .pipe(
    //         ofType(loginUser),
    //         mergeMap(action => this._userService.login(credentials as Credentials)
    //         .pipe(
    //             map(user => loginUser({user})),
    //             catchError(error => of(loginFailure({error})))
    //         )
    //     )
    // ));

}
