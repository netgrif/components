import {UserRegistrationRequest} from '../../../authentication/sign-up/models/user-registration-request';
import {Observable, of} from 'rxjs';
import {MessageResource} from '../../../resources/interface/message-resource';
import {UserInvitationRequest} from '../../../authentication/sign-up/models/user-invitation-request';
import {UserChangePasswordRequest} from "../../../authentication/profile/models/user-change-password-request";

/**
 * Mock the {@link SignUpService}. By default all responses are successful. Responses can be customised.
 */
export class MockSignUpService {

    public signupResponse: Observable<MessageResource> = of({success: 'success'});
    public inviteResponse: Observable<MessageResource> = of({success: 'success'});
    public resetPasswordResponse: Observable<MessageResource> = of({success: 'success'});
    public recoverPasswordResponse: Observable<MessageResource> = of({success: 'success'});
    public verifyResponse: Observable<MessageResource> = of({success: 'success'});
    public changePasswordResponse: Observable<MessageResource> = of({success: 'success'});

    constructor() {
    }

    public signup(newUser: UserRegistrationRequest): Observable<MessageResource> {
        return this.signupResponse;
    }

    public invite(invitation: UserInvitationRequest): Observable<MessageResource> {
        return this.inviteResponse;
    }

    public resetPassword(email: string): Observable<MessageResource> {
        return this.resetPasswordResponse;
    }

    public recoverPassword(token, password): Observable<MessageResource> {
        return this.recoverPasswordResponse;
    }

    public verify(token: string): Observable<MessageResource> {
        return this.verifyResponse;
    }

    public changePassword(change: UserChangePasswordRequest): Observable<MessageResource> {
        return this.changePasswordResponse;
    }
}
