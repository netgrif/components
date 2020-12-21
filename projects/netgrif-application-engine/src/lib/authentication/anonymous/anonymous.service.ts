import {Injectable, OnDestroy} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';


@Injectable({
    providedIn: 'root'
})
export class AnonymousService implements OnDestroy {

    public static readonly JWT_BEARER_HEADER_DEFAULT = 'Jwt-Auth-Token';
    private readonly _jwtHeader: string;
    private readonly _jwtEnabled: boolean;

    constructor(private _config: ConfigurationService) {
        this._jwtEnabled = this._config.get().providers.auth.jwtEnabled ? this._config.get().providers.auth.jwtEnabled : false;
        this._jwtHeader = this._config.get().providers.auth.jwtBearer ?
            this._config.get().providers.auth.jwtBearer : AnonymousService.JWT_BEARER_HEADER_DEFAULT;
    }

    get jwtEnabled(): boolean {
        return this._jwtEnabled;
    }

    get jwtHeader(): string {
        return this._jwtHeader;
    }

    ngOnDestroy(): void {
        localStorage.removeItem(this._jwtHeader);
    }
}
