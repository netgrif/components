import { Injectable } from '@angular/core';
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
        const authAddress = _config.get().providers.auth.address;
        if (!authAddress) {
            throw new Error('Authentication provider address is not set!');
        }
        this._changePassword = this.resolveEndpoint('changePassword', authAddress);
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

    /**
     * @param endpointKey the attribute name of the endpoint address in `nae.json`
     * @param baseUrl the base of the endpoint URL. Content resolved by key from `nae.json` is appended to the URL provided by this argument
     * @returns the endpoint address or `undefined` if such endpoint is not defined in `nae.json`
     */
    protected resolveEndpoint(endpointKey: string, baseUrl: string): string | undefined {
        const config = this._config.get();
        if (!config
            || !config.providers
            || !config.providers.auth
            || !config.providers.auth.endpoints
            || !config.providers.auth.endpoints[endpointKey]) {
            return undefined;
        }
        return baseUrl + config.providers.auth.endpoints[endpointKey];
    }
}
