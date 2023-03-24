import {Observable, of} from 'rxjs';
import {MessageResource} from '../../../resources/interface/message-resource';
import {UserChangePasswordRequest} from "../../../authentication/profile/models/user-change-password-request";

/**
 * Mock the {@link ProfileService}. By default all responses are successful. Responses can be customised.
 */
export class MockProfileService {

    public changePasswordResponse: Observable<MessageResource> = of({success: 'success'});

    public changePassword(change: UserChangePasswordRequest): Observable<MessageResource> {
        return this.changePasswordResponse;
    }
}
