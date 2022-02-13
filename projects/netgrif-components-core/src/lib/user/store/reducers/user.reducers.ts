// import {Action, createReducer, on} from '@ngrx/store';
// import {loginFailure, loginSuccess, loginUser, logoutUser} from '../actions/user.actions';
// import {User} from '../../models/user';
//
// export const USER_FEATURE_KEY = 'nae-user';
//
// export interface State {
//     user: User | null;
//     error: string | null;
// }
//
// export const initialState: State = {
//     user: null,
//     error: null
// };
//
// const userReducer = createReducer(
//     initialState,
//     on(loginUser, (state, {user}) => ({...state, user})),
//     on(loginSuccess, (state, {user}) => ({...state, user, error: null})),
//     on(loginFailure, (state, {error}) => ({...state, user: null, error})),
//     on(logoutUser, (state) => initialState),
// );
//
// export function reducer(state: State | undefined, action: Action) {
//     return userReducer(state, action);
// }
//
