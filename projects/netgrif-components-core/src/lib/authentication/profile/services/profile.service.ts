import {Injectable} from '@angular/core';
import {ConfigurationService} from "../../../configuration/configuration.service";
import {HttpClient} from "@angular/common/http";
import {LoggerService} from "../../../logger/services/logger.service";
import {Observable} from "rxjs";
import {MessageResource} from "../../../resources/interface/message-resource";
import {switchMap} from "rxjs/operators";
import {processMessageResponse} from "../../../utility/process-message-response";
import {UserChangePasswordRequest} from "../models/user-change-password-request";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    protected readonly _changePassword: string;

    constructor(protected _config: ConfigurationService, protected _http: HttpClient, protected _log: LoggerService) {
        this._changePassword = _config.resolveProvidersEndpoint('changePassword');
    }

    public changePassword(changePasswordRequest: UserChangePasswordRequest): Observable<MessageResource> {
        if (!this._changePassword) {
            throw new Error('Verify URL is not set in authentication provider endpoints!');
        }
        return this._http.post<MessageResource>(this._changePassword, changePasswordRequest).pipe(
            switchMap(processMessageResponse)
        );
    }

//TODO: Change Profile photo


}
