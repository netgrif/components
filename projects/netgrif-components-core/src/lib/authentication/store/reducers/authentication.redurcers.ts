// import {loginFailure, loginSuccess, logout} from '../actions/authentication.actions';
// import {Action, createReducer, on} from '@ngrx/store';
// import {AuthState, initialState} from '../authentication.state';
//
// const authReducer = createReducer(
//     initialState,
//     // on(login, (state) => ({...state, isAuthenticated: true})),
//     on(loginSuccess, (state, {user}) => ({...state, isAuthenticated: true, user, error: null})),
//     on(loginFailure, (state, {error}) => ({...state, isAuthenticated: true, user: null, error})),
//     on(logout, (state) => initialState),
// );
//
// export function reducer(state: AuthState | undefined, action: Action) {
//     return authReducer(state, action);
// }
//
