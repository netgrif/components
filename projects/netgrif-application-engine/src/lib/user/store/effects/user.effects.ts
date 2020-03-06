import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {UserService} from "../../services/user.service";
import {logoutUser, loginUser, loginFailure} from "../actions/user.actions";

@Injectable()
export class UserEffects {

    constructor(private _actions$: Actions, private _userService: UserService) {
    }

    loginUser$ = createEffect(() => this._actions$
        .pipe(
            ofType(loginUser),
            mergeMap(action => this._userService.login(action.user)
            .pipe(
                map(user => loginUser({user})),
                catchError(error => of(loginFailure({error})))
            )
        )
    ));

    logoutUser$ = createEffect(() => this._actions$
        .pipe(
            ofType(logoutUser),
            mergeMap(action => this._userService.logout()
                .pipe(
                    map(user => logoutUser),
                    catchError(error => of(logoutUser))
                )
            )
        ));

}
