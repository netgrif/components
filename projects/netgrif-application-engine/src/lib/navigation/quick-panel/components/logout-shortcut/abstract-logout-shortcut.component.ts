import {OnInit} from '@angular/core';
import {UserService} from '../../../../user/services/user.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {Router} from '@angular/router';

export abstract class AbstractLogoutShortcutComponent implements OnInit {

    constructor(protected _user: UserService,
                protected _log: LoggerService,
                protected _config: ConfigurationService,
                protected _router: Router) {
    }

    ngOnInit(): void {
    }

    logout(): void {
        this._user.logout().subscribe(() => {
            this._log.debug('User is logged out');
            const redirectPath = this._config.getServicesConfiguration()?.auth?.logoutRedirect;
            if (redirectPath !== undefined) {
                this._log.info('Redirecting to ' + redirectPath);
                this._router.navigate([redirectPath]);
            } else {
                this._log.debug('No logout redirect configured');
            }
        });
    }

}
