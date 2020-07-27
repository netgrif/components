// import {Injectable} from '@angular/core';
// import {Actions, createEffect, ofType} from '@ngrx/effects';
// import {Router} from '@angular/router';
// import {login, loginFailure, loginSuccess, logout} from '../actions/authentication.actions';
// import {of} from 'rxjs';
// import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
// import {Credentials} from '../../models/credentials';
// import {AuthenticationMethodService} from '../../services/authentication-method.service';
//
// @Injectable()
// export class AuthenticationEffects {
//
//     constructor(private actions$: Actions, private authService: AuthenticationMethodService, private router: Router) {
//     }
//
//     login$ = createEffect(() => this.actions$.pipe(
//         ofType(login),
//         exhaustMap(action =>
//             this.authService.login(action as Credentials).pipe(
//                 map(user => loginSuccess(user),
//                     catchError(error => of(loginFailure({error})))
//                 )
//             )
//         )));
//
//     loginSuccess$ = createEffect(() => this.actions$.pipe(
//         ofType(loginSuccess),
//         tap(action => {
//             this.authService.token = action.user.email;
//             this.router.navigateByUrl('/').then(r => {
//             });
//         })
//     ));
//
//     loginFailure$ = createEffect(() => this.actions$.pipe(
//         ofType(loginFailure),
//         tap(action => {
//             console.log(action.error);
//         })
//     ));
//
//     logout$ = createEffect(() => this.actions$.pipe(
//         ofType(logout),
//         tap(action => {
//             this.authService.token = '';
//             console.log(action.type + ': Logout successful');
//         })
//     ));
//
// }
