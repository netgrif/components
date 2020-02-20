import {createAction, props} from '@ngrx/store';
import {Credentials, User} from '../../models/user';

export enum AuthenticationActionTypes {
    LOGIN = '[AUTH] Login',
    LOGIN_SUCCESS = '[AUTH] Login success',
    LOGIN_FAILURE = '[AUTH] Login failure',

    LOGOUT = '[AUTH] Logout'
}

export const login = createAction(
    AuthenticationActionTypes.LOGIN,
    props<{ credentials: Credentials }>()
);

export const loginSuccess = createAction(
    AuthenticationActionTypes.LOGIN_SUCCESS,
    props<{ user: User }>()
);

export const loginFailure = createAction(
    AuthenticationActionTypes.LOGIN_FAILURE,
    props<{ error: any }>()
);

export const logout = createAction(
    AuthenticationActionTypes.LOGOUT,
);
