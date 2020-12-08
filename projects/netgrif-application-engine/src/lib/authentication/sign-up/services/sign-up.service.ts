import {Injectable} from '@angular/core';
import {LoggerService} from '../../../logger/services/logger.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRegistrationRequest} from '../models/user-registration-request';
import {MessageResource} from '../../../resources/interface/message-resource';
import {switchMap} from 'rxjs/operators';
import {UserInvitationRequest} from '../models/user-invitation-request';
import {SignUpModule} from '../sign-up.module';
import {processMessageResponse} from '../../../utility/process-message-response';

@Injectable({
    providedIn: SignUpModule
})
export class SignUpService {

    protected readonly _signUpUrl: string;
    protected readonly _verifyUrl: string;
    protected readonly _inviteUrl: string;
    protected readonly _resetUrl: string;
    protected readonly _recoverUrl: string;

    constructor(protected _config: ConfigurationService, protected _http: HttpClient, protected _log: LoggerService) {
        const authAddress = _config.get().providers.auth.address;
        if (!authAddress) {
            throw new Error('Authentication provider address is not set!');
        }
        this._signUpUrl = this.resolveEndpoint('signup', authAddress);
        this._verifyUrl = this.resolveEndpoint('verify', authAddress);
        this._inviteUrl = this.resolveEndpoint('invite', authAddress);
        this._resetUrl = this.resolveEndpoint('reset', authAddress);
        this._recoverUrl = this.resolveEndpoint('recover', authAddress);
    }

    public signup(newUser: UserRegistrationRequest): Observable<MessageResource> {
        if (!this._signUpUrl) {
            throw new Error('SingUp URL is not set in authentication provider endpoints!');
        }
        newUser.password = btoa(newUser.password);
        return this._http.post<MessageResource>(this._signUpUrl, newUser).pipe(
            switchMap(processMessageResponse)
        );
    }

    public invite(invitation: UserInvitationRequest): Observable<MessageResource> {
        if (!this._inviteUrl) {
            throw new Error('Invite URL is not set in authentication provider endpoints!');
        }
        if (!invitation.groups) {
            invitation.groups = [];
        }
        if (!invitation.processRoles) {
            invitation.processRoles = [];
        }
        return this._http.post<MessageResource>(this._inviteUrl, invitation).pipe(
            switchMap(processMessageResponse)
        );
    }

    public resetPassword(email: string): Observable<MessageResource> {
        if (!this._resetUrl) {
            throw new Error('Reset URL is not set in authentication provider endpoints!');
        }
        return this._http.post<MessageResource>(this._resetUrl, email).pipe(
            switchMap(processMessageResponse)
        );
    }

    public recoverPassword(token, password): Observable<MessageResource> {
        if (!this._recoverUrl) {
            throw new Error('Recover URL is not set in authentication provider endpoints!');
        }
        const request = {
            token,
            password: btoa(password),
            email: '',
            name: '',
            surname: ''
        };
        return this._http.post<MessageResource>(this._recoverUrl, request).pipe(
            switchMap(processMessageResponse)
        );
    }

    public verify(token: string): Observable<MessageResource> {
        if (!this._verifyUrl) {
            throw new Error('Verify URL is not set in authentication provider endpoints!');
        }
        return this._http.post<MessageResource>(this._verifyUrl, token).pipe(
            switchMap(processMessageResponse)
        );
    }

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
