import {USER_FEATURE_KEY, State as UserState} from '../reducers/user.reducers';
import {createSelector} from '@ngrx/store';

export const selectUser = state => state[USER_FEATURE_KEY];

export const selectLoggedUser = createSelector(
    selectUser,
    (state: UserState) => state.user
);
