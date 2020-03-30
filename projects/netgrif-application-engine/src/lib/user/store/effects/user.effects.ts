// import {Injectable} from '@angular/core';
// import {Actions} from '@ngrx/effects';
// import {UserService} from '../../services/user.service';
//
// @Injectable()
// export class UserEffects {
//
//     constructor(private _actions$: Actions, private _userService: UserService) {
//     }
//
//     loginUser$ = createEffect(() => this._actions$
//         .pipe(
//             ofType(loginUser),
//             mergeMap(action => this._userService.login(credentials as Credentials)
//             .pipe(
//                 map(user => loginUser({user})),
//                 catchError(error => of(loginFailure({error})))
//             )
//         )
//     ));
//
// }
