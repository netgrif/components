export const AUTHENTICATION_FEATURE_KEY = 'nae-auth';

export interface AuthState {
    isAuthenticated: boolean;
    session: string | null;
    error: string | null;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    session: null,
    error: null
};

export function getInitial(): AuthState {
    return initialState;
}

