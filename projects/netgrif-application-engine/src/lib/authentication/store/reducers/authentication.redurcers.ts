import {User} from '../../models/user';
import {loginFailure, loginSuccess, logout} from '../actions/authentication.actions';
import {Action, createReducer, on} from '@ngrx/store';

export const AUTHENTICATION_FEATURE_KEY = 'nae-auth';

export interface State {
    isAuthenticated: boolean;
    user: User | null;
    error: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    error: null
};

const authReducer = createReducer(
    initialState,
    // on(login, (state) => ({...state, isAuthenticated: true})),
    on(loginSuccess, (state, {user}) => ({...state, isAuthenticated: true, user, error: null})),
    on(loginFailure, (state, {error}) => ({...state, isAuthenticated: true, user: null, error})),
    on(logout, (state) => initialState),
);

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}

