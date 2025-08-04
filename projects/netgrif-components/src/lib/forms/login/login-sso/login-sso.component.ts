import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractLoginSsoComponent, ConfigurationService, LoggerService, SnackBarService} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-login-sso',
    templateUrl: './login-sso.component.html',
    styleUrls: ['./login-sso.component.scss'],
})
export class LoginSsoComponent extends AbstractLoginSsoComponent {
    constructor(
        protected _config: ConfigurationService,
        protected _http: HttpClient,
        protected _snackbar: SnackBarService,
        protected _log: LoggerService,
        protected _router: Router,
        protected _activeRouter: ActivatedRoute,
        protected _translate: TranslateService
    ) {
        super(_config, _http, _snackbar, _log, _router, _activeRouter, _translate);
    }
}
