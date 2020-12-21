import {Injectable, OnDestroy} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';


@Injectable({
    providedIn: 'root'
})
export class AnonymousService implements OnDestroy {

    public static readonly JWT_BEARER_HEADER_DEFAULT = 'Jwt-Auth-Token';
    private readonly _jwtHeader: string;

    constructor(private _config: ConfigurationService) {
        this._jwtHeader = this._config.get().providers.auth.jwtBearer ?
            this._config.get().providers.auth.jwtBearer : AnonymousService.JWT_BEARER_HEADER_DEFAULT;
    }

    get jwtHeader(): string {
        return this._jwtHeader;
    }

    ngOnDestroy(): void {
        localStorage.removeItem(this._jwtHeader);
    }
}
