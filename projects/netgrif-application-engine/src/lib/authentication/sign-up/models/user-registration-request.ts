import {UserPasswordRequest} from './user-password-request';

export interface UserRegistrationRequest extends UserPasswordRequest {
    name: string;
    surname: string;
}
